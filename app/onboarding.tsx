import { Redirect } from 'expo-router';

import { LaunchView } from '@/components/LaunchView';
import { OnboardingScreen } from '@/features/onboarding/OnboardingScreen';
import { useSessionState } from '@/session/SessionProvider';

export default function OnboardingRoute() {
  const state = useSessionState();
  if (state.status === 'hydrating') return <LaunchView />;
  if (state.status === 'subscribed') return <Redirect href="/home" />;
  return <OnboardingScreen />;
}
