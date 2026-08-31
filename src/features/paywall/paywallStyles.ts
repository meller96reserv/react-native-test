import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/theme/tokens';

export const paywallStyles = StyleSheet.create({
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
