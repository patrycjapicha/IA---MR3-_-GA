import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Returns true if the error originates from Figma's own infrastructure
 * (IframeMessageAbortError / message-port-destroyed errors). These are
 * platform-level noise that should never surface to the end-user.
 */
function isFigmaInfraError(error: unknown): boolean {
  if (!error) return false;
  const e = error as any;
  const name: string = String(e?.name ?? '');
  const message: string = String(e?.message ?? '');
  const stack: string = String(e?.stack ?? '');
  
  const patterns = [
    'IframeMessageAbortError',
    'message port was destroyed',
    'Message aborted',
    'setupMessageChannel',
    'figma_app',
    'webpack-artifacts',
  ];
  
  return patterns.some(pattern => 
    name.includes(pattern) || 
    message.includes(pattern) || 
    stack.includes(pattern)
  );
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Don't set error state for Figma infrastructure errors
    if (isFigmaInfraError(error)) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (isFigmaInfraError(error)) {
      // Silently reset — don't show error UI for platform noise
      this.setState({ hasError: false, error: null });
      return;
    }
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError && !isFigmaInfraError(error)) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-xl mb-2">Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}