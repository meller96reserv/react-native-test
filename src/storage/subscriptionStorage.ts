import AsyncStorage from '@react-native-async-storage/async-storage';

import type { SubscriptionPlan } from '@/session/types';

const STORAGE_KEY = '@focus-flow/subscription';
const RECORD_VERSION = 1;

type SubscriptionRecord = {
  version: typeof RECORD_VERSION;
  active: true;
  plan: SubscriptionPlan;
};

export function parseSubscriptionRecord(value: string | null): SubscriptionRecord | null {
  if (value === null) return null;

  try {
    const candidate: unknown = JSON.parse(value);
    if (
      typeof candidate === 'object' &&
      candidate !== null &&
      'version' in candidate &&
      candidate.version === RECORD_VERSION &&
      'active' in candidate &&
      candidate.active === true &&
      'plan' in candidate &&
      (candidate.plan === 'monthly' || candidate.plan === 'yearly')
    ) {
      return candidate as SubscriptionRecord;
    }
  } catch {
    // Повреждённая запись безопасно считается отсутствующей подпиской.
  }
  return null;
}

export const subscriptionStorage = {
  async read(): Promise<SubscriptionRecord | null> {
    return parseSubscriptionRecord(await AsyncStorage.getItem(STORAGE_KEY));
  },
  async save(plan: SubscriptionPlan): Promise<void> {
    const record: SubscriptionRecord = { version: RECORD_VERSION, active: true, plan };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  },
};
