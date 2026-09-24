import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Copy, Home } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  /** Shown above the error message. */
  title?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Route-level error boundary.
 *
 * Wrap any subtree that could throw at render. On error:
 *  - Keeps the app chrome (header, nav) mounted
 *  - Shows a fallback with Reload / Home / Copy-error actions
 *  - In dev, exposes the full stack for debugging
 *
 * The parent is responsible for keying this by location so navigating
 * away from a broken page clears the error:
 *
 *   <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    // Surface to the console in a collapsed group so it doesn't spam.
    console.groupCollapsed('[ErrorBoundary] caught render error');
    console.error(error);
    console.error(errorInfo.componentStack);
    console.groupEnd();
  }

  reset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  reload = () => {
    window.location.reload();
  };

  goHome = () => {
    window.location.href = '/chart';
  };

  copyError = async () => {
    const { error, errorInfo } = this.state;
    const payload = [
      `Message: ${error?.message ?? 'unknown'}`,
      '',
      `Stack:`,
      error?.stack ?? '(none)',
      '',
      `Component stack:`,
      errorInfo?.componentStack ?? '(none)',
      '',
      `URL: ${window.location.href}`,
      `Time: ${new Date().toISOString()}`,
      `User agent: ${navigator.userAgent}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(payload);
      toast.success('Error details copied.');
    } catch {
      toast.error('Clipboard unavailable.');
    }
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const { error, errorInfo } = this.state;
    const isDev = import.meta.env.DEV;

    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 space-y-6">
        <div className="flex items-start gap-4">
          <span className="shrink-0 mt-1 text-amber-600 dark:text-amber-400">
            <AlertTriangle size={28} />
          </span>
          <div className="min-w-0 space-y-2">
            <h1
              className="text-xl font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {this.props.title ?? 'Something went wrong in this section'}
            </h1>
            <p className="text-sm text-muted-foreground">
              The rest of the app is still working. You can reload this page,
              return to the chart, or copy the error details below.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-4 space-y-2">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400">
              {error.name || 'Error'}
            </p>
            <p className="text-sm text-foreground/85 font-mono break-words">
              {error.message || '(no message)'}
            </p>
          </div>
        )}

        {isDev && errorInfo?.componentStack && (
          <details className="rounded-xl border bg-muted/40 p-4">
            <summary className="text-xs font-medium cursor-pointer text-muted-foreground">
              Component stack (dev only)
            </summary>
            <pre className="mt-3 text-[11px] leading-relaxed whitespace-pre-wrap break-words font-mono text-muted-foreground">
              {errorInfo.componentStack}
            </pre>
          </details>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={this.reload} size="sm" className="gap-1.5">
            <RotateCcw size={13} /> Reload
          </Button>
          <Button onClick={this.goHome} size="sm" variant="outline" className="gap-1.5">
            <Home size={13} /> Go to Chart
          </Button>
          <Button onClick={this.copyError} size="sm" variant="ghost" className="gap-1.5">
            <Copy size={13} /> Copy error
          </Button>
          <Button onClick={this.reset} size="sm" variant="ghost">
            Try again
          </Button>
        </div>
      </div>
    );
  }
}