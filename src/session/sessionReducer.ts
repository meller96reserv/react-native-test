import type { SessionAction, SessionState } from './types';

export const initialSessionState: SessionState = { status: 'hydrating' };

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'HYDRATE_ANONYMOUS':
      return { status: 'anonymous', onboardingCompleted: false, purchaseError: null };
    case 'HYDRATE_SUBSCRIBED':
    case 'PURCHASE_SUCCESS':
      return { status: 'subscribed', plan: action.plan };
    case 'COMPLETE_ONBOARDING':
      if (state.status !== 'anonymous') return state;
      return { ...state, onboardingCompleted: true, purchaseError: null };
    case 'PURCHASE_START':
      if (state.status !== 'anonymous' || !state.onboardingCompleted) return state;
      return { status: 'purchasing', plan: action.plan };
    case 'PURCHASE_FAILURE':
      if (state.status !== 'purchasing') return state;
      return {
        status: 'anonymous',
        onboardingCompleted: true,
        purchaseError: action.message,
      };
    default:
      return state;
  }
}
