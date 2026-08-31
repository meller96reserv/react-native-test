import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

export function LaunchView() {
  return (
    <View accessibilityLabel="Загрузка приложения" style={styles.container} testID="launch-view">
      <View style={styles.mark}>
        <Text style={styles.markText}>S</Text>
      </View>
      <Text style={styles.title}>Skate Escape</Text>
      <ActivityIndicator color={colors.primary} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.canvas,
    padding: spacing.lg,
  },
  mark: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: { ...typography.title, color: colors.canvas },
  title: { ...typography.heading, color: colors.ink, marginTop: spacing.md },
  spinner: { marginTop: spacing.lg },
});
