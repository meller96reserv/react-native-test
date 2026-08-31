import { StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

import { Screen } from '@/components/Screen';
import { useSessionState } from '@/session/SessionProvider';

import { SkaterGame } from './game/SkaterGame';

export function HomeScreen() {
  const state = useSessionState();
  if (state.status === 'hydrating') return null;
  if (state.status !== 'subscribed') return <Redirect href="/onboarding" />;

  return (
    <Screen contentStyle={styles.content} testID="home-screen">
      <SkaterGame plan={state.plan} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 0, paddingVertical: 0 },
});
