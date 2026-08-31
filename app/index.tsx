import { Redirect } from 'expo-router';

import { LaunchView } from '@/components/LaunchView';
import { useSessionState } from '@/session/SessionProvider';

export default function IndexRoute() {
  const state = useSessionState();
  if (state.status === 'hydrating') return <LaunchView />;
  return <Redirect href={state.status === 'subscribed' ? '/home' : '/onboarding'} />;
}
