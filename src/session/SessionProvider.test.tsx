import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

import { subscriptionStorage } from '@/storage/subscriptionStorage';

import { SessionProvider, useSessionActions, useSessionState } from './SessionProvider';

jest.mock('@/storage/subscriptionStorage', () => ({
  subscriptionStorage: { read: jest.fn(), save: jest.fn() },
}));

const mockedStorage = jest.mocked(subscriptionStorage);
let resolveRead: (() => void) | undefined;

function Harness() {
  const state = useSessionState();
  const { completeOnboarding, purchase } = useSessionActions();
  const [plan] = useState<'yearly'>('yearly');
  return (
    <View>
      <Text testID="status">{state.status}</Text>
      {'purchaseError' in state && state.purchaseError ? <Text>{state.purchaseError}</Text> : null}
      <Pressable onPress={completeOnboarding} testID="onboard" />
      <Pressable onPress={() => void purchase(plan)} testID="purchase" />
    </View>
  );
}

describe('SessionProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockedStorage.read.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRead = () => resolve(null);
        }),
    );
  });

  afterEach(() => jest.useRealTimers());

  it('hydrates and completes a successful purchase', async () => {
    mockedStorage.save.mockResolvedValueOnce();
    const view = await render(
      <SessionProvider>
        <Harness />
      </SessionProvider>,
    );
    await act(async () => resolveRead?.());
    await waitFor(() => expect(view.getByTestId('status')).toHaveTextContent('anonymous'));
    await fireEvent.press(view.getByTestId('onboard'));
    await fireEvent.press(view.getByTestId('purchase'));
    expect(view.getByTestId('status')).toHaveTextContent('purchasing');

    await act(() => jest.advanceTimersByTimeAsync(650));
    expect(view.getByTestId('status')).toHaveTextContent('subscribed');
    expect(mockedStorage.save).toHaveBeenCalledWith('yearly');
    await view.unmount();
  });

  it('exposes a retryable error when saving fails', async () => {
    mockedStorage.save.mockRejectedValueOnce(new Error('disk unavailable'));
    const view = await render(
      <SessionProvider>
        <Harness />
      </SessionProvider>,
    );
    await act(async () => resolveRead?.());
    await waitFor(() => expect(view.getByTestId('status')).toHaveTextContent('anonymous'));
    await fireEvent.press(view.getByTestId('onboard'));
    await fireEvent.press(view.getByTestId('purchase'));
    await act(() => jest.advanceTimersByTimeAsync(650));

    expect(view.getByText(/Не удалось сохранить покупку/)).toBeOnTheScreen();
    expect(view.getByTestId('status')).toHaveTextContent('anonymous');
    await view.unmount();
  });
});
