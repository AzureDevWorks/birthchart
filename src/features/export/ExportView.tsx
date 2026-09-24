import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  FileJson,
  FileText,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActiveProfile } from '@/features/birth-profile/store';
import { useUserLocation } from '@/lib/use-user-location';
import { useReadingStore, hashProfile } from '@/features/ai-reading/store';
import { useDailyRashiStore } from '@/features/dashboard/lib/daily-rashi-store';
import { BirthDateField } from '@/features/birth-profile/components/BirthDateField';
import { PlaceCombobox } from '@/features/birth-profile/components/PlaceCombobox';
import { PlacePreview } from '@/features/birth-profile/components/PlacePreview';
import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import {
  generateKundliPdf,
  mapExportSectionsToReport,
} from '@/features/report-pdf';

import { downloadExportBundle } from './lib/builder';
import {
  SECTIONS,
  SECTION_GROUPS,
  PRESETS,
  AYANAMSA_OPTIONS,
  HOUSE_SYSTEM_OPTIONS,
  DEFAULT_EXPORT_OPTIONS,
  estimateBytes,
  formatBytes,
  isSectionAvailable,
  type SectionId,
  type SectionDef,
  type SectionGroup,
  type Availability,
  type Ayanamsa,
  type HouseSystem,
} from './lib/sections';
import type { Place } from '@/domain/geo/place';
import type { BirthData } from '@/domain/astrology/birth-data';

type OutputKind = 'json' | 'pdf';

export function ExportView() {
  const activeProfile = useActiveProfile();
  const location = useUserLocation();

  const readings = useReadingStore((s) => s.records);
  const dailyRashi = useDailyRashiStore((s) => s.records);

  // ── Form state — seeded from the active profile ────────────────────
  const [name, setName] = useState(activeProfile?.profileName ?? '');
  const [date, setDate] = useState(activeProfile?.localDate ?? '');
  const [time, setTime] = useState(activeProfile?.localTime ?? '');
  const [place, setPlace] = useState<Place | null>(activeProfile?.place ?? null);

  const [ayanamsa, setAyanamsa] = useState<Ayanamsa>(DEFAULT_EXPORT_OPTIONS.ayanamsa);
  const [houseSystem, setHouseSystem] = useState<HouseSystem>(
    DEFAULT_EXPORT_OPTIONS.houseSystem
  );

  const matchesSavedProfile = useMemo(() => {
    if (!activeProfile) return false;
    return (
      activeProfile.profileName === name.trim() &&
      activeProfile.localDate === date &&
      activeProfile.localTime === time &&
      activeProfile.place.id === place?.id &&
      activeProfile.place.lat === place?.lat &&
      activeProfile.place.lon === place?.lon &&
      activeProfile.place.timezone === place?.timezone
    );
  }, [activeProfile, name, date, time, place]);

  const hasReadings = useMemo(() => {
    if (!activeProfile) return false;
    const hash = hashProfile(activeProfile);
    return Object.values(readings).some((r) => r.profileHash === hash);
  }, [activeProfile, readings]);

  const hasDailyRashi = useMemo(() => {
    if (!activeProfile) return false;
    const hash = hashProfile(activeProfile);
    return Object.values(dailyRashi).some((r) => r.profileHash === hash);
  }, [activeProfile, dailyRashi]);

  const profileReady =
    name.trim().length > 0 &&
    date.length > 0 &&
    time.length > 0 &&
    place !== null;

  const availability: Availability = useMemo(
    () => ({
      hasProfile: profileReady,
      location,
      matchesSavedProfile,
      hasReadings,
      hasDailyRashi,
    }),
    [profileReady, location, matchesSavedProfile, hasReadings, hasDailyRashi]
  );

  const [selected, setSelected] = useState<Set<SectionId>>(
    () => new Set(PRESETS.Standard)
  );
  const [busy, setBusy] = useState<OutputKind | null>(null);

  const estimate = useMemo(() => estimateBytes(selected), [selected]);

  const toggle = (id: SectionId) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectPreset = (p: string) => setSelected(new Set(PRESETS[p]));
  const clearAll = () => setSelected(new Set());
  const resetFromActive = () => {
    if (!activeProfile) return;
    setName(activeProfile.profileName);
    setDate(activeProfile.localDate);
    setTime(activeProfile.localTime);
    setPlace(activeProfile.place);
  };

  const buildProfile = (): BirthData | null => {
    if (!profileReady || !place) return null;
    return {
      id: 'export-temp',
      profileName: name.trim() || 'Unnamed',
      localDate: date,
      localTime: time,
      place,
      createdAt: new Date().toISOString(),
    };
  };

  // ── JSON handler ───────────────────────────────────────────────
  const handleExportJson = () => {
    const profile = buildProfile();
    if (!profile) {
      toast.error('Complete the birth data first.');
      return;
    }
    if (selected.size === 0) {
      toast.error('Select at least one section.');
      return;
    }

    setBusy('json');
    setTimeout(() => {
      try {
        const result = downloadExportBundle(profile, location, selected, {
          ayanamsa,
          houseSystem,
        });
        const kb = (result.bytes / 1024).toFixed(1);
        if (result.errors > 0) {
          toast.success(
            'Exported ' + kb + ' KB - ' + result.errors + ' section(s) failed.',
            { description: 'See _meta.errors in the file.' }
          );
        } else {
          toast.success('Exported ' + kb + ' KB.');
        }
      } catch (e) {
        toast.error((e as Error).message ?? 'Export failed.');
      } finally {
        setBusy(null);
      }
    }, 30);
  };

  // ── PDF handler ────────────────────────────────────────────────
  const handleExportPdf = async () => {
    const profile = buildProfile();
    if (!profile) {
      toast.error('Complete the birth data first.');
      return;
    }
    if (selected.size === 0) {
      toast.error('Select at least one section.');
      return;
    }

    setBusy('pdf');
    const toastId = toast.loading('Composing report...');

    try {
      const kundli = prisriJyotish.calculate(profile, {
        ayanamsa,
        houseSystem,
        includeChalit: true,
        includeKp: true,
        includeSpecialLagnas: true,
        includeArudhas: true,
        includeReferenceCharts: true,
      });

      const reportSections = mapExportSectionsToReport(selected);

      const result = await generateKundliPdf(profile, kundli as any, {
        sections: reportSections,
        ayanamsa,
        houseSystem,
      });

      const kb = (result.bytes / 1024).toFixed(0);
      toast.success('Report ready \u2014 ' + kb + ' KB.', {
        id: toastId,
        description: result.filename,
        duration: 6000,
      });
    } catch (e) {
      console.error(e);
      toast.error((e as Error).message ?? 'Report generation failed.', {
        id: toastId,
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12 space-y-6">
      <header className="space-y-3">
        <Link
          to="/profiles"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} /> Back
        </Link>

        <div className="space-y-1">
          <p
            className="text-[10px] uppercase tracking-[0.35em] font-semibold text-primary/70"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Export &amp; Report
          </p>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {activeProfile ? activeProfile.profileName : 'Compose'}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Choose the birth data, calculation options, and which sections to
            include. Then export the raw JSON &mdash; or compose a designed
            PDF report.
          </p>
        </div>
      </header>

      {/* ── Birth data ────────────────────────────────────── */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-3 border-b bg-gradient-to-r from-primary/[0.04] to-transparent flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-primary/70">
            Birth Data
          </p>
          {activeProfile && (
            <button
              type="button"
              onClick={resetFromActive}
              className="text-[10px] uppercase tracking-wider text-primary/70 hover:text-primary font-semibold transition-colors"
            >
              Reset from active profile
            </button>
          )}
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="exp-name" className="text-xs">Name</Label>
            <Input
              id="exp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-xs">Birth Date</Label>
              <BirthDateField
                value={date}
                onChange={setDate}
                minYear={1900}
                maxYear={new Date().getFullYear()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-time" className="text-xs">Birth Time</Label>
              <Input
                id="exp-time"
                type="time"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Birth Place</Label>
            {place ? (
              <PlacePreview
                place={place}
                localDate={date}
                localTime={time}
                onChange={() => setPlace(null)}
              />
            ) : (
              <PlaceCombobox value={null} onChange={setPlace} />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="exp-ayanamsa" className="text-xs">Ayanamsa</Label>
              <select
                id="exp-ayanamsa"
                value={ayanamsa}
                onChange={(e) => setAyanamsa(e.target.value as Ayanamsa)}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {AYANAMSA_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {AYANAMSA_OPTIONS.find((o) => o.value === ayanamsa)?.hint}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-house" className="text-xs">House System</Label>
              <select
                id="exp-house"
                value={houseSystem}
                onChange={(e) => setHouseSystem(e.target.value as HouseSystem)}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {HOUSE_SYSTEM_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {HOUSE_SYSTEM_OPTIONS.find((o) => o.value === houseSystem)?.hint}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections ──────────────────────────────────────── */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary/70">
                Sections
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {selected.size} of {SECTIONS.length} selected &middot; ~{formatBytes(estimate)}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(PRESETS).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => selectPreset(p)}
                  className="text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors hover:bg-primary/[0.05] hover:border-primary/40"
                  style={{ borderColor: 'hsl(var(--border))' }}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors hover:bg-muted/40"
                style={{ borderColor: 'hsl(var(--border))' }}
              >
                None
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {SECTION_GROUPS.map((group) => {
            const items = SECTIONS.filter((s) => s.group === group);
            if (items.length === 0) return null;
            return (
              <GroupBlock
                key={group}
                group={group}
                items={items}
                selected={selected}
                availability={availability}
                onToggle={toggle}
              />
            );
          })}
        </div>
      </div>

      {/* ── Actions ───────────────────────────────────────── */}
      <div className="sticky bottom-4 z-10">
        <div className="rounded-2xl border bg-background/95 backdrop-blur px-5 py-3 flex items-center justify-between gap-4 shadow-lg flex-wrap">
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {selected.size} section{selected.size === 1 ? '' : 's'}
              <span className="text-muted-foreground font-normal">
                {' '}&middot; {profileReady ? name.trim() || 'Unnamed' : 'No birth data'}
              </span>
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {ayanamsa} &middot; {houseSystem}
              {place ? ' \u00b7 ' + place.shortLabel : ''}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={handleExportJson}
              disabled={busy !== null || selected.size === 0 || !profileReady}
              variant="outline"
              className="gap-2"
            >
              {busy === 'json' ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> JSON...
                </>
              ) : (
                <>
                  <FileJson size={14} /> Export JSON
                </>
              )}
            </Button>
            <Button
              onClick={handleExportPdf}
              disabled={busy !== null || selected.size === 0 || !profileReady}
              className="gap-2"
            >
              {busy === 'pdf' ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> PDF...
                </>
              ) : (
                <>
                  <FileText size={14} /> Export PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────── */}
      <div className="rounded-2xl border bg-muted/20 p-5 text-[12px] leading-relaxed space-y-2">
        <p className="font-medium text-foreground/85">Two outputs, one selection</p>
        <p className="text-muted-foreground">
          <strong className="text-foreground/70">Export JSON</strong> writes every
          selected section as raw JSON &mdash; planetary positions, vargas,
          predictions, gochar, readings &mdash; for AI tools, archival, or
          external analysis.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground/70">Export PDF</strong> composes the
          chart sections into a designed report. The JSON-only sections
          (predictions, festivals, chalit, KP) are quietly skipped; the chart
          sections you selected become pages in the report.
        </p>
      </div>
    </div>
  );
}

function GroupBlock({
  group,
  items,
  selected,
  availability,
  onToggle,
}: {
  group: SectionGroup;
  items: SectionDef[];
  selected: Set<SectionId>;
  availability: Availability;
  onToggle: (id: SectionId) => void;
}) {
  const allSelected = items.every((s) => selected.has(s.id));

  const toggleAll = () => {
    if (allSelected) {
      items.forEach((s) => { if (selected.has(s.id)) onToggle(s.id); });
    } else {
      items.forEach((s) => { if (!selected.has(s.id)) onToggle(s.id); });
    }
  };

  return (
    <div>
      <div className="px-6 py-3 flex items-center justify-between gap-3 bg-muted/20">
        <div className="flex items-center gap-2">
          <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-foreground/80">
            {group}
          </p>
          <span className="text-[10px] text-muted-foreground">
            {items.filter((s) => selected.has(s.id)).length}/{items.length}
          </span>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="text-[10px] uppercase tracking-wider text-primary/70 hover:text-primary font-semibold transition-colors"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      <div className="divide-y divide-border/40">
        {items.map((def) => {
          const avail = isSectionAvailable(def, availability);
          const isSelected = selected.has(def.id) && avail.ok;
          return (
            <label
              key={def.id}
              className={
                'flex items-start gap-3 px-6 py-3.5 transition-colors ' +
                (avail.ok ? 'cursor-pointer hover:bg-muted/20' : 'opacity-55 cursor-not-allowed')
              }
            >
              <Checkbox
                checked={isSelected}
                onChange={() => avail.ok && onToggle(def.id)}
                disabled={!avail.ok}
              />
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground">{def.label}</span>
                  <SizePill size={def.size} />
                  <PdfBadge mode={def.pdf} />
                  {!avail.ok && (
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium inline-flex items-center gap-1">
                      <AlertTriangle size={9} />
                      {avail.reason}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {def.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Checkbox({
  checked, onChange, disabled,
}: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <span
      onClick={(e) => { e.preventDefault(); if (!disabled) onChange(); }}
      className={
        'shrink-0 mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ' +
        (checked ? 'bg-primary border-primary text-primary-foreground' : 'border-input bg-background')
      }
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
    >
      {checked && <Check size={10} strokeWidth={3} />}
    </span>
  );
}

function SizePill({ size }: { size: SectionDef['size'] }) {
  const map: Record<SectionDef['size'], { cls: string; label: string }> = {
    small: { cls: 'bg-muted/60 text-muted-foreground', label: 'S' },
    medium: { cls: 'bg-muted/60 text-muted-foreground', label: 'M' },
    large: { cls: 'bg-amber-500/10 text-amber-700 dark:text-amber-400', label: 'L' },
    huge: { cls: 'bg-red-500/10 text-red-700 dark:text-red-400', label: 'XL' },
  };
  const { cls, label } = map[size];
  return (
    <span
      className={
        'inline-flex items-center gap-1 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold ' + cls
      }
      title={'Size: ' + size}
    >
      {label}
    </span>
  );
}

function PdfBadge({ mode }: { mode: 'page' | 'feeds' | 'json-only' }) {
  const map: Record<typeof mode, { label: string; cls: string }> = {
    'page':      { label: 'PDF',  cls: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' },
    'feeds':     { label: 'into PDF', cls: 'bg-blue-500/10 text-blue-700 dark:text-blue-400' },
    'json-only': { label: 'JSON only', cls: 'bg-muted/60 text-muted-foreground' },
  };
  const { label, cls } = map[mode];
  return (
    <span className={'inline-flex items-center text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold ' + cls}>
      {label}
    </span>
  );
}