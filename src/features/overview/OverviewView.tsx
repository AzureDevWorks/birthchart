import { useMemo } from 'react';
import type { Kundli } from '@prisri/jyotish';
import { Button } from '@/components/ui/button';
import {
  prisriJyotish,
  BirthDataError,
} from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { useActiveProfile, useBirthStore } from '../birth-profile/store';
import { BirthProfileForm } from '../birth-profile/components/BirthProfileForm';
import { ReportOverview } from '@/features/report/components/ReportOverview';

export function OverviewView() {
  const profile = useActiveProfile();

  if (!profile) {
    return (
      <div className="p-8">
        <BirthProfileForm />
      </div>
    );
  }
  return <ReportView profile={profile} />;
}

function ReportView({
  profile,
}: {
  profile: NonNullable<ReturnType<typeof useActiveProfile>>;
}) {
  const clearAll = useBirthStore((s) => s.clearAll);

  const { kundli, error } = useMemo(() => {
    try {
      return { kundli: prisriJyotish.calculate(profile), error: null as string | null };
    } catch (e) {
      return {
        kundli: null as Kundli | null,
        error: e instanceof BirthDataError ? e.message : 'Chart calculation failed.',
      };
    }
  }, [profile]);

  if (error || !kundli) {
    return (
      <div className="p-8 max-w-lg mx-auto space-y-4">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error ?? 'Chart calculation failed.'}
        </div>
        <Button variant="destructive" onClick={clearAll}>
          Reset
        </Button>
      </div>
    );
  }

  return (
    <ReportOverview
      profile={profile}
      kundli={kundli as unknown as Record<string, any>}
      onReset={clearAll}
    />
  );
}