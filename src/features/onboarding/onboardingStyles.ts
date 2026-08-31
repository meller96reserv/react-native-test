import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@/theme/tokens';

export const onboardingStyles = StyleSheet.create({
  content: { justifyContent: 'space-between', paddingTop: spacing.xl, paddingBottom: spacing.lg },
  copy: { marginVertical: spacing.xl },
  eyebrow: { ...typography.caption, color: colors.primary, letterSpacing: 2 },
  title: { ...typography.display, color: colors.ink, marginTop: spacing.sm },
  description: { ...typography.body, color: colors.muted, marginTop: spacing.md, maxWidth: 520 },
});
