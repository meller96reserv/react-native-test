import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

export const planCardStyles = StyleSheet.create({
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
  selected: { borderColor: colors.accent, backgroundColor: '#28143D' },
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
    color: colors.canvas,
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
