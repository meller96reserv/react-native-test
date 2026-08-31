import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { useSessionActions } from '@/session/SessionProvider';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export function OnboardingScreen() {
  const { completeOnboarding } = useSessionActions();

  const handleContinue = useCallback(() => {
    completeOnboarding();
    router.replace('/paywall');
  }, [completeOnboarding]);

  return (
    <Screen contentStyle={styles.content} testID="onboarding-screen">
      <View style={styles.hero} accessibilityLabel="Скейтборд на рампе">
        <View style={styles.ramp} />
        <View style={styles.skateboard}>
          <View style={styles.deck} />
          <View style={styles.wheelLeft} />
          <View style={styles.wheelRight} />
        </View>
      </View>
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

const styles = StyleSheet.create({
  content: { justifyContent: 'space-between', paddingTop: spacing.xl, paddingBottom: spacing.lg },
  hero: {
    height: 260,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ramp: {
    position: 'absolute',
    width: 230,
    height: 120,
    left: -28,
    bottom: -44,
    borderTopRightRadius: 120,
    backgroundColor: '#5B21B6',
    transform: [{ rotate: '-4deg' }],
  },
  skateboard: {
    position: 'absolute',
    width: 132,
    height: 40,
    right: 42,
    top: 92,
    transform: [{ rotate: '-14deg' }],
  },
  deck: { width: 132, height: 14, borderRadius: 9, backgroundColor: colors.accent },
  wheelLeft: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    left: 20,
    top: 15,
    backgroundColor: colors.ink,
  },
  wheelRight: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    right: 20,
    top: 15,
    backgroundColor: colors.ink,
  },
  copy: { marginVertical: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.primary, letterSpacing: 2 },
  title: { ...typography.display, color: colors.ink, marginTop: spacing.sm },
  description: { ...typography.body, color: colors.muted, marginTop: spacing.md, maxWidth: 520 },
});
