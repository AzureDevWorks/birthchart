import { VedicChart } from './components/VedicChart';

export function ChartPreview() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Vedic Chart Preview
        </h1>
        <p className="text-sm text-muted-foreground">
          Session 1 — grid only. Toggle between North Indian and South Indian styles.
          Verify the house layout matches your reference chart.
        </p>
      </div>

      <VedicChart
        size={520}
        defaultStyle="north"
        caption="Empty chart grid — planets coming in Session 2"
      />
    </div>
  );
}
