import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { useSessionActions } from '@/session/SessionProvider';

import { OnboardingHero } from './OnboardingHero';
import { onboardingStyles as styles } from './onboardingStyles';

export function OnboardingScreen() {
  const { completeOnboarding } = useSessionActions();

  const handleContinue = useCallback(() => {
    completeOnboarding();
    router.replace('/paywall');
  }, [completeOnboarding]);

  return (
    <Screen contentStyle={styles.content} testID="onboarding-screen">
      <OnboardingHero />
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>SKATE ESCAPE</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Прыгай выше.{`\n`}Уезжай дальше.
        </Text>
        <Text style={styles.description}>
          Разгоняйся по улицам, перепрыгивай полицейские машины и ставь новый рекорд.
        </Text>
      </View>
      <PrimaryButton
        accessibilityHint="Открывает выбор подписки"
        label="Продолжить"
        onPress={handleContinue}
      />
    </Screen>
  );
}
