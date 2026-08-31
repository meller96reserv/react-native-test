import { memo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

type PrimaryButtonProps = Pick<PressableProps, 'onPress' | 'accessibilityHint' | 'testID'> & {
  label: string;
  loading?: boolean;
  disabled?: boolean;
};

export const PrimaryButton = memo(function PrimaryButton({
  label,
  loading = false,
  disabled = false,
  onPress,
  accessibilityHint,
  testID,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.surface} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  pressed: { backgroundColor: colors.primaryPressed, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.55 },
  label: { ...typography.label, color: colors.surface },
});
