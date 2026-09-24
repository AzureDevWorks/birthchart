import { useRef } from 'react';
import {
  Star,
  MapPin,
  Trash2,
  CheckCircle2,
  Users,
  FileJson,
  Upload,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { RELATION_LABELS, type BirthData } from '@/domain/astrology/birth-data';

interface ProfileCardProps {
  profile: BirthData;
  isMaster: boolean;
  isActive: boolean;
  readingsCount: number;
  onActivate: () => void;
  onSetMaster: () => void;
  onExportReadings: () => void;
  onImportReadings: (file: File) => void;
  onDelete: () => void;
}

export function ProfileCard({
  profile,
  isMaster,
  isActive,
  readingsCount,
  onActivate,
  onSetMaster,
  onExportReadings,
  onImportReadings,
  onDelete,
}: ProfileCardProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const relation = profile.relation ?? 'family';
  const relationLabel = RELATION_LABELS[relation];

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) onImportReadings(file);
  };

  return (
    <article
      className={cn(
        'group relative rounded-2xl border overflow-hidden transition-all duration-200',
        isActive
          ? 'border-primary/60 bg-primary/[0.03] shadow-md'
          : 'border-border/60 bg-card hover:border-primary/40 hover:shadow-sm'
      )}
    >
      {isActive && (
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.5))',
          }}
        />
      )}

      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {isMaster && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                  <Star size={9} fill="currentColor" />
                  {t('profiles.master', { defaultValue: 'Master' })}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground font-medium">
                {relationLabel}
              </span>
            </div>
            <h3
              className="mt-2 text-lg font-semibold leading-tight truncate"
              style={{
                fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              {profile.profileName}
            </h3>
          </div>
        </div>

        <div className="space-y-1.5 text-[12px] text-muted-foreground">
          <p className="font-mono tabular-nums">
            {profile.localDate} · {profile.localTime}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={11} className="shrink-0 opacity-70" />
            <span className="truncate">{profile.place.shortLabel}</span>
          </p>
        </div>

        {profile.notes && (
          <p className="text-[11px] text-muted-foreground italic leading-snug line-clamp-2">
            {profile.notes}
          </p>
        )}

        <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2 text-[11px]">
          <span className="text-muted-foreground">
            {readingsCount}{' '}
            {t('profiles.readings', { defaultValue: 'readings' })}
          </span>
          {isActive && (
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
              <CheckCircle2 size={11} />
              {t('profiles.active', { defaultValue: 'Active' })}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-border/40 space-y-2">
          {/* Row 1 - state changes */}
          {(!isActive || !isMaster) && (
            <div className="flex flex-wrap gap-1.5">
              {!isActive && (
                <button
                  type="button"
                  onClick={onActivate}
                  className="text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors hover:bg-primary/[0.06] hover:border-primary/40"
                  style={{ borderColor: 'hsl(var(--border))' }}
                >
                  {t('profiles.setActive', { defaultValue: 'Set Active' })}
                </button>
              )}
              {!isMaster && (
                <button
                  type="button"
                  onClick={onSetMaster}
                  className="text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors hover:bg-amber-500/[0.06] hover:border-amber-500/40"
                  style={{ borderColor: 'hsl(var(--border))' }}
                  title={t('profiles.makeMasterHint', {
                    defaultValue: 'Mark this as the master (self) profile',
                  })}
                >
                  <Users size={10} className="inline mr-1" />
                  {t('profiles.makeMaster', { defaultValue: 'Make Master' })}
                </button>
              )}
            </div>
          )}

          {/* Row 2 - profile snapshot + delete */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <button
              type="button"
              onClick={onExportReadings}
              disabled={readingsCount === 0}
              className="text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors hover:bg-primary/[0.06] hover:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderColor: 'hsl(var(--border))' }}
              title={t('profiles.exportProfileHint', {
                defaultValue:
                  'Download this profile\u2019s saved readings and daily rashi. Restorable on any device.',
              })}
            >
              <FileJson size={10} className="inline mr-1" />
              {t('profiles.exportProfile', { defaultValue: 'Export profile' })}
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors hover:bg-muted/40"
              style={{ borderColor: 'hsl(var(--border))' }}
              title={t('profiles.importProfileHint', {
                defaultValue: 'Merge a profile snapshot back into the app.',
              })}
            >
              <Upload size={10} className="inline mr-1" />
              {t('profiles.importProfile', { defaultValue: 'Import profile' })}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={onDelete}
              className="text-[11px] px-3 py-1.5 rounded-md border font-medium transition-colors hover:bg-red-500/[0.06] hover:border-red-500/40 text-red-700 dark:text-red-400 ml-auto"
              style={{ borderColor: 'hsl(var(--border))' }}
              title={t('common.delete', { defaultValue: 'Delete' })}
            >
              <Trash2 size={10} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}