import type { ReactNode } from 'react';

export interface ReportPageProps {
  children: ReactNode;
  maxWidth?: string;
}

export function ReportPage({ children, maxWidth = '900px' }: ReportPageProps) {
  return (
    <div className="w-full flex justify-center px-4 md:px-6 py-6">
      <div className="w-full space-y-2" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
