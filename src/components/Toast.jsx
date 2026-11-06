import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const ToastContext = createContext({ show: () => {} });

/**
 * One polite live region for the whole page. A toast is a paper slip that
 * slides up from the lower edge; it can carry one optional action (e.g. Urungkan).
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);

  const show = useCallback((message, { action, duration = 3200, tone = "default" } = {}) => {
    window.clearTimeout(timer.current);
    setToast({ id: Date.now(), message, action, tone });
    timer.current = window.setTimeout(() => setToast(null), duration);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" role="status" aria-live="polite" aria-atomic="true">
        {toast && (
          <div className="toast" data-tone={toast.tone} key={toast.id}>
            <span className="toast__message">{toast.message}</span>
            {toast.action && (
              <button
                className="toast__action"
                type="button"
                onClick={() => {
                  toast.action.onClick();
                  dismiss();
                }}
              >
                {toast.action.label}
              </button>
            )}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
