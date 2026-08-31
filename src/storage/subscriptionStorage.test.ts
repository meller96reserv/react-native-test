import AsyncStorage from '@react-native-async-storage/async-storage';

import { parseSubscriptionRecord, subscriptionStorage } from './subscriptionStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockedStorage = jest.mocked(AsyncStorage);

describe('subscription storage', () => {
  beforeEach(() => jest.clearAllMocks());

  it.each([
    null,
    '',
    'not-json',
    '{}',
    '{"version":2,"active":true,"plan":"yearly"}',
    '{"version":1,"active":false,"plan":"yearly"}',
    '{"version":1,"active":true,"plan":"weekly"}',
  ])('rejects invalid record %p', (value) => {
    expect(parseSubscriptionRecord(value)).toBeNull();
  });

  it('parses a supported active subscription', () => {
    expect(parseSubscriptionRecord('{"version":1,"active":true,"plan":"yearly"}')).toEqual({
      version: 1,
      active: true,
      plan: 'yearly',
    });
  });

  it('persists a versioned record', async () => {
    mockedStorage.setItem.mockResolvedValueOnce();
    await subscriptionStorage.save('monthly');
    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      '@focus-flow/subscription',
      '{"version":1,"active":true,"plan":"monthly"}',
    );
  });
});
