import { memo, type RefObject } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import type { SubscriptionPlan } from '@/session/types';
import { colors, spacing, typography } from '@/theme/tokens';

type GameHudProps = { plan: SubscriptionPlan; scoreRef: RefObject<TextInput | null> };

export const GameHud = memo(function GameHud({ plan, scoreRef }: GameHudProps) {
  const planLabel = plan === 'yearly' ? 'ГОД' : 'МЕСЯЦ';

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>Skate escape</Text>
        <Text
          accessibilityLabel={`Активная подписка: ${plan === 'yearly' ? 'год' : 'месяц'}`}
          style={styles.plan}
        >
          SKATE PASS · {planLabel}
        </Text>
      </View>
      <TextInput
        ref={scoreRef}
        accessible={false}
        defaultValue="0 🚓"
        editable={false}
        pointerEvents="none"
        style={styles.score}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { ...typography.heading, color: colors.ink },
  plan: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
    letterSpacing: 0.8,
  },
  score: {
    ...typography.label,
    minWidth: 72,
    padding: 0,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
  },
});
