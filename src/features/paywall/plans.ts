import type { SubscriptionPlan } from '@/session/types';

export type Plan = {
  id: SubscriptionPlan;
  title: string;
  price: string;
  cadence: string;
  badge?: string;
  detail: string;
};

export const PLANS = [
  {
    id: 'monthly',
    title: 'Месяц',
    price: '399 ₽',
    cadence: 'в месяц',
    detail: 'Месяц бесконечных уличных заездов',
  },
  {
    id: 'yearly',
    title: 'Год',
    price: '2 390 ₽',
    cadence: 'в год · 199 ₽/мес',
    badge: '−50%',
    detail: 'Целый сезон и экономия 2 398 ₽',
  },
] as const satisfies readonly [Plan, Plan];
