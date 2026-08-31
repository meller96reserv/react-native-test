export type SubscriptionPlan = 'monthly' | 'yearly';

export type SessionState =
  | { status: 'hydrating' }
  | { status: 'anonymous'; onboardingCompleted: boolean; purchaseError: string | null }
  | { status: 'purchasing'; plan: SubscriptionPlan }
  | { status: 'subscribed'; plan: SubscriptionPlan };

export type SessionAction =
  | { type: 'HYDRATE_ANONYMOUS' }
  | { type: 'HYDRATE_SUBSCRIBED'; plan: SubscriptionPlan }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'PURCHASE_START'; plan: SubscriptionPlan }
  | { type: 'PURCHASE_SUCCESS'; plan: SubscriptionPlan }
  | { type: 'PURCHASE_FAILURE'; message: string };
