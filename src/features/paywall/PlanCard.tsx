import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

import type { Plan } from './plans';

type PlanCardProps = { plan: Plan; selected: boolean; disabled: boolean; onSelect: () => void };

export const PlanCard = memo(function PlanCard({
  plan,
  selected,
  disabled,
  onSelect,
}: PlanCardProps) {
  return (
    <Pressable
      accessibilityLabel={`${plan.title}, ${plan.price}, ${plan.cadence}`}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onSelect}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      testID={`plan-${plan.id}`}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{plan.title}</Text>
          {plan.badge ? <Text style={styles.badge}>{plan.badge}</Text> : null}
        </View>
        <Text style={styles.detail}>{plan.detail}</Text>
      </View>
      <View style={styles.priceBlock}>
        <Text style={styles.price}>{plan.price}</Text>
        <Text style={styles.cadence}>{plan.cadence}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    minHeight: 112,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  selected: { borderColor: colors.primary, backgroundColor: '#F5FAF7' },
  pressed: { opacity: 0.86 },
  disabled: { opacity: 0.6 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  copy: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { ...typography.heading, color: colors.ink },
  badge: {
    ...typography.caption,
    color: colors.ink,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  detail: { ...typography.caption, color: colors.muted, marginTop: spacing.xs },
  priceBlock: { alignItems: 'flex-end', maxWidth: 105 },
  price: { ...typography.label, color: colors.ink },
  cadence: { ...typography.caption, color: colors.muted, textAlign: 'right' },
});
