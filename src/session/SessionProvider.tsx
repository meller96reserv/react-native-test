import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { subscriptionStorage } from '@/storage/subscriptionStorage';

import { initialSessionState, sessionReducer } from './sessionReducer';
import type { SessionState, SubscriptionPlan } from './types';

type SessionActions = {
  completeOnboarding: () => void;
  purchase: (plan: SubscriptionPlan) => Promise<void>;
};

const SessionStateContext = createContext<SessionState | null>(null);
const SessionActionsContext = createContext<SessionActions | null>(null);

const PURCHASE_DELAY_MS = 650;
const PURCHASE_ERROR_MESSAGE = 'Не удалось сохранить покупку. Попробуйте ещё раз.';

export function SessionProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState);

  useEffect(() => {
    let active = true;
    void subscriptionStorage
      .read()
      .then((record) => {
        if (!active) return;
        dispatch(
          record
            ? { type: 'HYDRATE_SUBSCRIBED', plan: record.plan }
            : { type: 'HYDRATE_ANONYMOUS' },
        );
      })
      .catch(() => {
        if (active) dispatch({ type: 'HYDRATE_ANONYMOUS' });
      });
    return () => {
      active = false;
    };
  }, []);

  const completeOnboarding = useCallback(() => dispatch({ type: 'COMPLETE_ONBOARDING' }), []);

  const purchase = useCallback(async (plan: SubscriptionPlan) => {
    dispatch({ type: 'PURCHASE_START', plan });
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, PURCHASE_DELAY_MS));
      await subscriptionStorage.save(plan);
      dispatch({ type: 'PURCHASE_SUCCESS', plan });
    } catch {
      dispatch({ type: 'PURCHASE_FAILURE', message: PURCHASE_ERROR_MESSAGE });
    }
  }, []);

  const actions = useMemo(() => ({ completeOnboarding, purchase }), [completeOnboarding, purchase]);

  return (
    <SessionStateContext.Provider value={state}>
      <SessionActionsContext.Provider value={actions}>{children}</SessionActionsContext.Provider>
    </SessionStateContext.Provider>
  );
}

export function useSessionState() {
  const value = useContext(SessionStateContext);
  if (!value) throw new Error('useSessionState must be used inside SessionProvider');
  return value;
}

export function useSessionActions() {
  const value = useContext(SessionActionsContext);
  if (!value) throw new Error('useSessionActions must be used inside SessionProvider');
  return value;
}
