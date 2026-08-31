import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { useSessionActions, useSessionState } from '@/session/SessionProvider';
import type { SubscriptionPlan } from '@/session/types';
import { colors, spacing, typography } from '@/theme/tokens';

import { PlanCard } from './PlanCard';
import { PLANS } from './plans';

export function PaywallScreen() {
  const state = useSessionState();
  const { purchase } = useSessionActions();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('yearly');
  const purchasing = state.status === 'purchasing';
  const error = state.status === 'anonymous' ? state.purchaseError : null;

  const selectMonthly = useCallback(() => setSelectedPlan('monthly'), []);
  const selectYearly = useCallback(() => setSelectedPlan('yearly'), []);
  const handlePurchase = useCallback(() => void purchase(selectedPlan), [purchase, selectedPlan]);

  if (state.status === 'hydrating') return null;
  if (state.status === 'subscribed') return <Redirect href="/home" />;
  if (state.status === 'anonymous' && !state.onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Screen contentStyle={styles.content} scrollable testID="paywall-screen">
      <View>
        <Text style={styles.eyebrow}>ПРЕМИУМ-ДОСТУП</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Ваш фокус —{`\n`}без ограничений
        </Text>
        <Text style={styles.description}>
          Все практики, персональные серии и спокойная статистика прогресса.
        </Text>
      </View>

      <View accessibilityRole="radiogroup" style={styles.plans}>
        <PlanCard
          disabled={purchasing}
          onSelect={selectMonthly}
          plan={PLANS[0]}
          selected={selectedPlan === 'monthly'}
        />
        <PlanCard
          disabled={purchasing}
          onSelect={selectYearly}
          plan={PLANS[1]}
          selected={selectedPlan === 'yearly'}
        />
      </View>

      <View style={styles.footer}>
        {error ? (
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
        ) : null}
        <PrimaryButton
          accessibilityHint="Эмулирует покупку выбранной подписки"
          label="Продолжить"
          loading={purchasing}
          onPress={handlePurchase}
          testID="purchase-button"
        />
        <Text style={styles.disclaimer}>Тестовая покупка · списания не производятся</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.primary, letterSpacing: 1.8 },
  title: { ...typography.display, color: colors.ink, marginTop: spacing.sm },
  description: { ...typography.body, color: colors.muted, marginTop: spacing.md },
  plans: { gap: spacing.md, marginTop: spacing.xl },
  footer: { marginTop: 'auto', paddingTop: spacing.xl, paddingBottom: spacing.sm },
  error: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
