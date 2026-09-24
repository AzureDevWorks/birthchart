import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Plus,
  Upload,
  Users,
  Star,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useBirthStore } from '@/features/birth-profile/store';
import { useReadingStore } from '@/features/ai-reading/store';
import { BirthProfileForm } from '@/features/birth-profile/components/BirthProfileForm';
import { hashProfile } from '@/features/ai-reading/store';
import { exportProfileBundle } from '@/lib/profile-backup';
import { importAnyBackup, summarizeImport } from '@/lib/import-any';
import { ProfileCard } from './components/ProfileCard';

export function ProfilesView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const profiles = useBirthStore((s) => s.profiles);
  const activeProfileId = useBirthStore((s) => s.activeProfileId);
  const masterProfileId = useBirthStore((s) => s.masterProfileId);
  const setActive = useBirthStore((s) => s.setActive);
  const setMaster = useBirthStore((s) => s.setMaster);
  const removeProfile = useBirthStore((s) => s.removeProfile);
  const readings = useReadingStore((s) => s.records);

  const [showAdd, setShowAdd] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileList = useMemo(
    () =>
      Object.values(profiles).sort((a, b) => {
        if (a.id === masterProfileId) return -1;
        if (b.id === masterProfileId) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }),
    [profiles, masterProfileId]
  );

  const readingsByProfile = useMemo(() => {
    const map: Record<string, number> = {};
    for (const profile of profileList) {
      const hash = hashProfile(profile);
      let count = 0;
      for (const rec of Object.values(readings)) {
        if ((rec as { profileHash?: string }).profileHash === hash) count++;
      }
      map[profile.id] = count;
    }
    return map;
  }, [profileList, readings]);

  // ── Top-level import — sniffs format, dispatches ───────
  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = async (file: File) => {
    try {
      const result = await importAnyBackup(file);
      toast.success('Imported: ' + summarizeImport(result), { duration: 6000 });
      setTimeout(() => window.location.reload(), 1200);
    } catch (e) {
      toast.error((e as Error).message ?? 'Import failed.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) void handleImportFile(file);
  };

  // ── Per-profile export / import ───────────────────────
  const handleExportReadings = (id: string) => {
    try {
      const result = exportProfileBundle(id);
      const kb = (result.bytes / 1024).toFixed(1);
      toast.success(
        'Exported ' + result.readingCount + ' reading(s) \u00b7 ' + kb + ' KB.',
        { description: result.filename }
      );
    } catch (e) {
      toast.error((e as Error).message ?? 'Export failed.');
    }
  };

  const handleImportReadings = async (file: File) => {
    // Per-card import also uses the dispatcher, so a whole-app backup
    // dropped here will still work.
    try {
      const result = await importAnyBackup(file);
      toast.success('Imported: ' + summarizeImport(result), { duration: 6000 });
      setTimeout(() => window.location.reload(), 1200);
    } catch (e) {
      toast.error((e as Error).message ?? 'Import failed.');
    }
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const profile = profiles[pendingDelete];
    removeProfile(pendingDelete);
    toast.success(
      profile
        ? `Removed ${profile.profileName}.`
        : t('profiles.removed', { defaultValue: 'Profile removed.' })
    );
    setPendingDelete(null);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-6">
      <header className="space-y-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} />
          {t('common.back', { defaultValue: 'Back' })}
        </Link>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <p
              className="text-[10px] uppercase tracking-[0.35em] font-semibold text-primary/70"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {t('profiles.eyebrow', { defaultValue: 'Profile Management' })}
            </p>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{
                fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              {t('profiles.title', { defaultValue: 'Your Profiles' })}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              {t('profiles.subtitle', {
                defaultValue:
                  'Keep multiple people under one roof - yourself, family, friends, and clients. Each profile has its own chart and its own reading library.',
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button onClick={() => setShowAdd(true)} size="sm" className="gap-1.5">
              <Plus size={13} />
              {t('profiles.add', { defaultValue: 'Add Profile' })}
            </Button>
            <Button asChild size="sm" variant="outline" className="gap-1.5">
              <Link to="/export">
                <Package size={13} />
                {t('profiles.exportChart', { defaultValue: 'Export chart' })}
              </Link>
            </Button>
            <Button
              onClick={handleImportClick}
              size="sm"
              variant="outline"
              className="gap-1.5"
              title={t('profiles.importHint', {
                defaultValue:
                  'Import a profile snapshot or a whole-app backup. The file type is detected automatically.',
              })}
            >
              <Upload size={13} />
              {t('profiles.import', { defaultValue: 'Import' })}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </header>

      {profileList.length === 0 && (
        <div className="rounded-2xl border bg-card p-12 text-center space-y-4">
          <Users size={32} className="mx-auto text-muted-foreground/50" />
          <div className="space-y-1">
            <p
              className="text-lg font-semibold"
              style={{
                fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              {t('profiles.empty', { defaultValue: 'No profiles yet' })}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('profiles.emptyHint', {
                defaultValue:
                  'Add your first birth profile to begin. You can add more people later.',
              })}
            </p>
          </div>
          <Button onClick={() => setShowAdd(true)} className="gap-1.5">
            <Plus size={13} />
            {t('profiles.addFirst', { defaultValue: 'Add your first profile' })}
          </Button>
        </div>
      )}

      {masterProfileId && profiles[masterProfileId] && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Star
              size={13}
              className="text-amber-600 dark:text-amber-400"
              fill="currentColor"
            />
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-muted-foreground">
              {t('profiles.masterSection', { defaultValue: 'Master Profile' })}
            </h2>
          </div>
          <ProfileCard
            profile={profiles[masterProfileId]}
            isMaster
            isActive={masterProfileId === activeProfileId}
            readingsCount={readingsByProfile[masterProfileId] ?? 0}
            onActivate={() => {
              setActive(masterProfileId);
              navigate('/');
            }}
            onSetMaster={() => setMaster(masterProfileId)}
            onExportReadings={() => handleExportReadings(masterProfileId)}
            onImportReadings={handleImportReadings}
            onDelete={() => setPendingDelete(masterProfileId)}
          />
        </section>
      )}

      {profileList.filter((p) => p.id !== masterProfileId).length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Users size={13} className="text-muted-foreground" />
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-muted-foreground">
              {t('profiles.othersSection', { defaultValue: 'Other Profiles' })}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileList
              .filter((p) => p.id !== masterProfileId)
              .map((p) => (
                <ProfileCard
                  key={p.id}
                  profile={p}
                  isMaster={false}
                  isActive={p.id === activeProfileId}
                  readingsCount={readingsByProfile[p.id] ?? 0}
                  onActivate={() => {
                    setActive(p.id);
                    toast.success(`Now viewing ${p.profileName}.`);
                    navigate('/');
                  }}
                  onSetMaster={() => setMaster(p.id)}
                  onExportReadings={() => handleExportReadings(p.id)}
                  onImportReadings={handleImportReadings}
                  onDelete={() => setPendingDelete(p.id)}
                />
              ))}
          </div>
        </section>
      )}

      <div className="rounded-2xl border bg-muted/20 p-5 flex items-start gap-3">
        <Sparkles size={14} className="text-primary/70 mt-0.5 shrink-0" />
        <div className="space-y-2 text-[12px] leading-relaxed">
          <p className="font-medium text-foreground/85">
            {t('profiles.aboutTitle', { defaultValue: 'Snapshot vs. build' })}
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground/70">Export profile</strong>{' '}
            saves what is already in the app for one person - their readings
            and daily rashi - so it can be restored later. Nothing is
            recomputed. Use <strong className="text-foreground/70">Import
            profile</strong> to bring it back.
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground/70">Export chart</strong> opens
            a builder where you recompute the kundli with any ayanamsa and
            house system, and download the raw output for AI tools or
            astrologers. It cannot be imported back.
          </p>
        </div>
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {t('profiles.add', { defaultValue: 'Add Profile' })}
            </DialogTitle>
            <DialogDescription>
              {t('profiles.addHint', {
                defaultValue: 'Enter birth details for a new profile.',
              })}
            </DialogDescription>
          </DialogHeader>
          <BirthProfileForm onSuccess={() => setShowAdd(false)} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(pendingDelete)}
        onOpenChange={(o) => !o && setPendingDelete(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t('profiles.confirmDeleteTitle', {
                defaultValue: 'Delete this profile?',
              })}
            </DialogTitle>
            <DialogDescription>
              {t('profiles.confirmDeleteBody', {
                defaultValue:
                  'The profile and all its readings will be removed. This cannot be undone.',
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              {t('common.cancel', { defaultValue: 'Cancel' })}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {t('common.delete', { defaultValue: 'Delete' })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}