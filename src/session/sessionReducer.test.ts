import { initialSessionState, sessionReducer } from './sessionReducer';

describe('sessionReducer', () => {
  it('hydrates an active subscription', () => {
    expect(
      sessionReducer(initialSessionState, { type: 'HYDRATE_SUBSCRIBED', plan: 'yearly' }),
    ).toEqual({ status: 'subscribed', plan: 'yearly' });
  });

  it('moves through onboarding and purchase', () => {
    const anonymous = sessionReducer(initialSessionState, { type: 'HYDRATE_ANONYMOUS' });
    const onboarded = sessionReducer(anonymous, { type: 'COMPLETE_ONBOARDING' });
    const purchasing = sessionReducer(onboarded, { type: 'PURCHASE_START', plan: 'monthly' });
    const subscribed = sessionReducer(purchasing, { type: 'PURCHASE_SUCCESS', plan: 'monthly' });

    expect(onboarded).toMatchObject({ status: 'anonymous', onboardingCompleted: true });
    expect(purchasing).toEqual({ status: 'purchasing', plan: 'monthly' });
    expect(subscribed).toEqual({ status: 'subscribed', plan: 'monthly' });
  });

  it('returns to a retryable paywall after persistence failure', () => {
    const failed = sessionReducer(
      { status: 'purchasing', plan: 'yearly' },
      { type: 'PURCHASE_FAILURE', message: 'Ошибка записи' },
    );
    expect(failed).toEqual({
      status: 'anonymous',
      onboardingCompleted: true,
      purchaseError: 'Ошибка записи',
    });
  });

  it('ignores purchase before onboarding', () => {
    const state = { status: 'anonymous', onboardingCompleted: false, purchaseError: null } as const;
    expect(sessionReducer(state, { type: 'PURCHASE_START', plan: 'yearly' })).toBe(state);
  });
});
