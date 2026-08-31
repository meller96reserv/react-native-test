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
      <View style={styles.hero} accessibilityLabel="Абстрактная иллюстрация спокойного фокуса">
        <View style={styles.orbit} />
        <View style={styles.sun} />
        <View style={styles.leaf} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>FOCUS FLOW</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Меньше шума.{`\n`}Больше важного.
        </Text>
        <Text style={styles.description}>
          Небольшие ежедневные ритуалы помогают удерживать внимание и двигаться к цели.
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
  orbit: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  sun: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.accent },
  leaf: {
    position: 'absolute',
    width: 68,
    height: 108,
    right: 34,
    bottom: 25,
    borderTopLeftRadius: 68,
    borderBottomRightRadius: 68,
    backgroundColor: '#80B99A',
    transform: [{ rotate: '18deg' }],
  },
  copy: { marginVertical: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.primary, letterSpacing: 2 },
  title: { ...typography.display, color: colors.ink, marginTop: spacing.sm },
  description: { ...typography.body, color: colors.muted, marginTop: spacing.md, maxWidth: 520 },
});
