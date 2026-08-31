import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { Plan } from './plans';
import { planCardStyles as styles } from './planCardStyles';

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
