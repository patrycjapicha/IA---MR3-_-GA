/**
 * Ultra-aggressive Figma error suppression
 * This module MUST be imported before anything else to intercept errors at the earliest possible moment
 */

// Figma infrastructure error patterns
const FIGMA_ERROR_PATTERNS = [
  'IframeMessageAbortError',
  'message port was destroyed',
  'Message aborted',
  'setupMessageChannel',
  'figma_app',
  'webpack-artifacts',
  '4239-c4c06d09094e9c07',
  'eI.setupMessageChannel',
  'r.cleanup',
  's.cleanup',
  'figma.com/webpack',
];

function isFigmaInfraError(error: any): boolean {
  if (!error) return false;
  
  const errorString = String(error);
  const name = String(error?.name ?? '');
  const message = String(error?.message ?? '');
  const stack = String(error?.stack ?? '');
  
  return FIGMA_ERROR_PATTERNS.some(pattern => 
    errorString.includes(pattern) ||
    name.includes(pattern) || 
    message.includes(pattern) || 
    stack.includes(pattern)
  );
}

// Execute immediately when this module loads - IIFE for instant execution
(function() {
  if (typeof window === 'undefined') return;
  
  // ==================== INTERCEPT ERROR CONSTRUCTOR ====================
  // This catches errors at the moment they're created
  const OriginalError = window.Error;
  const OriginalTypeError = window.TypeError;
  
  // Create custom error constructor
  (window as any).Error = function(message?: string, ...args: any[]) {
    if (message && isFigmaInfraError({ message })) {
      // Return a neutered error that won't log
      const err = new OriginalError('');
      err.name = 'SuppressedFigmaError';
      err.message = '';
      err.stack = '';
      return err;
    }
    return new OriginalError(message, ...args);
  };
  (window as any).Error.prototype = OriginalError.prototype;
  
  // ==================== CONSOLE OVERRIDES ====================
  const _error = console.error.bind(console);
  const _warn = console.warn.bind(console);
  const _log = console.log.bind(console);
  
  // Create wrapper function that filters Figma errors
  const createConsoleFilter = (originalFn: Function) => {
    return function(...args: any[]) {
      // Check if any argument matches Figma error patterns
      const hasFigmaError = args.some(arg => {
        if (!arg) return false;
        
        // Check the argument itself
        if (isFigmaInfraError(arg)) return true;
        
        // Check if it's an Error object
        if (arg instanceof Error && isFigmaInfraError(arg)) return true;
        
        // Check string arguments
        if (typeof arg === 'string' && FIGMA_ERROR_PATTERNS.some(p => arg.includes(p))) {
          return true;
        }
        
        return false;
      });
      
      if (!hasFigmaError) {
        originalFn.apply(console, args);
      }
    };
  };
  
  // Override console methods
  try {
    console.error = createConsoleFilter(_error);
    console.warn = createConsoleFilter(_warn);
  } catch (e) {
    // Console might be read-only
  }
  
  // ==================== WINDOW ERROR HANDLERS ====================
  
  // Capture phase error listener (highest priority)
  window.addEventListener('error', (event: ErrorEvent) => {
    if (isFigmaInfraError(event.error) || 
        isFigmaInfraError(event.message) ||
        isFigmaInfraError({ stack: event.error?.stack })) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }, { capture: true, passive: false });
  
  // Bubble phase error listener (backup)
  window.addEventListener('error', (event: ErrorEvent) => {
    if (isFigmaInfraError(event.error) || isFigmaInfraError(event.message)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }, { capture: false, passive: false });
  
  // Promise rejection handlers
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    if (isFigmaInfraError(event.reason)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }, { capture: true, passive: false });
  
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    if (isFigmaInfraError(event.reason)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  }, { capture: false, passive: false });
  
  // ==================== WINDOW.ONERROR ====================
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (isFigmaInfraError(error) || 
        isFigmaInfraError(message) || 
        (typeof message === 'string' && FIGMA_ERROR_PATTERNS.some(p => message.includes(p))) ||
        (source && typeof source === 'string' && source.includes('figma.com'))) {
      return true; // Suppress the error
    }
    if (originalOnError) {
      return originalOnError.call(window, message, source, lineno, colno, error);
    }
    return false;
  };
  
  // ==================== WINDOW.ONUNHANDLEDREJECTION ====================
  const originalOnUnhandledRejection = window.onunhandledrejection;
  window.onunhandledrejection = function(event: PromiseRejectionEvent) {
    if (isFigmaInfraError(event.reason)) {
      event.preventDefault();
      return;
    }
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(window, event);
    }
  };
  
})();

export {};