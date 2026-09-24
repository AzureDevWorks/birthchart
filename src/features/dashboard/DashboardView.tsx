import { useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { useActiveProfile } from '@/features/birth-profile/store';
import { BirthProfileForm } from '@/features/birth-profile/components/BirthProfileForm';
import { useUserLocation } from '@/lib/use-user-location';
import { CurrentLocationDialog } from '@/components/current-location-dialog';
import { useDashboardData } from './hooks/useDashboardData';
import { useDailyRashi } from './hooks/useDailyRashi';
import { DailyRashiTile } from './components/DailyRashiTile';
import { AnchorsTile } from './components/AnchorsTile';
import { TransitTile } from './components/TransitTile';
import { ChapterTile } from './components/ChapterTile';
import { PanchangTile } from './components/PanchangTile';
import { ReadingTile } from './components/ReadingTile';
import type { BirthData } from '@/domain/astrology/birth-data';

export function DashboardView() {
  const profile = useActiveProfile();
  if (!profile) {
    return (
      <div className="p-8">
        <BirthProfileForm />
      </div>
    );
  }
  return <DashboardBody profile={profile} />;
}

function greetingFor(hour: number): string {
  if (hour < 5) return 'A quiet night';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

function DashboardBody({ profile }: { profile: BirthData }) {
  const { t } = useTranslation();
  const userLocation = useUserLocation();
  const data = useDashboardData(profile, userLocation);
  const dailyRashi = useDailyRashi(
    profile,
    data.kundli,
    data.gochar,
    data.panchang,
    userLocation
  );
  const [locationOpen, setLocationOpen] = useState(false);

  const now = DateTime.now().setZone(userLocation.timezone);
  const greeting = greetingFor(now.hour);
  const firstName =
    profile.profileName.trim().split(/\s+/)[0] ?? profile.profileName;
  const dateLine = now.toFormat('cccc, dd LLLL yyyy');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10 space-y-5">
      {/* ═══ Greeting header ═══ */}
      <header className="pb-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <p
              className="text-2xl md:text-3xl font-semibold tracking-tight"
              style={{
                fontFamily:
                  "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
                letterSpacing: '-0.01em',
              }}
            >
              {greeting}, {firstName}
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
              {dateLine}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setLocationOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1.5 transition-all hover:border-primary/40 hover:bg-primary/[0.04] no-print"
            style={{ borderColor: 'hsl(38 55% 48% / 0.25)' }}
            title={t('location.changeTitle', {
              defaultValue: 'Change current location',
            })}
          >
            <MapPin size={12} className="text-primary/70 shrink-0" />
            <span className="text-xs font-medium text-foreground/85 truncate max-w-[140px]">
              {userLocation.shortLabel}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-primary/70 group-hover:text-primary font-semibold transition-colors">
              {t('common.change', { defaultValue: 'Change' })}
            </span>
          </button>
        </div>
      </header>

      {/* ═══ Chart failure ═══ */}
      {data.errors.includes('chart') && (
        <div
          className="rounded-2xl border p-5 text-sm"
          style={{
            borderColor: 'hsl(6 60% 44% / 0.3)',
            background: 'hsl(6 60% 44% / 0.04)',
          }}
        >
          <p className="font-medium" style={{ color: 'hsl(6 60% 38%)' }}>
            {t('dashboard.chartFailed', {
              defaultValue: 'Chart could not be computed.',
            })}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('dashboard.chartFailedHint', {
              defaultValue: 'Check the birth details and try again.',
            })}
          </p>
        </div>
      )}

      {/* ═══ Hero — Today's Rashi ═══ */}
      <DailyRashiTile
        rashi={dailyRashi}
        chandraNakshatra={data.kundli?.planets?.Moon?.nakshatra ?? null}
        chandraPada={data.kundli?.planets?.Moon?.pada ?? null}
      />

      {/* ═══ Anchors strip — full width, 3 columns ═══ */}
      {data.kundli && <AnchorsTile kundli={data.kundli} />}

      {/* ═══ Two-column grid ═══ */}
      {data.kundli && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.gochar && <TransitTile gochar={data.gochar} />}
          {data.panchang && (
            <PanchangTile panchang={data.panchang} place={userLocation} />
          )}
          <ChapterTile kundli={data.kundli} />
          <ReadingTile
            count={data.readingsCount}
            suggestedId={data.suggestedCategoryId}
          />
        </div>
      )}

      {/* ═══ Print-only footer ═══ */}
      <div className="print-footer hidden">KundaliYatra · Dashboard</div>

      <CurrentLocationDialog
        open={locationOpen}
        onOpenChange={setLocationOpen}
      />
    </div>
  );
}