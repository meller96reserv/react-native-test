import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { Redirect } from 'expo-router';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { useSessionActions, useSessionState } from '@/session/SessionProvider';
import type { SubscriptionPlan } from '@/session/types';

import { PlanCard } from './PlanCard';
import { paywallStyles as styles } from './paywallStyles';
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
        <Text style={styles.eyebrow}>SKATE PASS</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Улицы ждут.{`\n`}Выбирай заезд.
        </Text>
        <Text style={styles.description}>
          Открой бесконечный заезд, перепрыгивай патрули и сохраняй лучший результат.
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
        <Text style={styles.disclaimer}>Тестовый Skate Pass · списания не производятся</Text>
      </View>
    </Screen>
  );
}
