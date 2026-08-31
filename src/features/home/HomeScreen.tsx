import { StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';

import { Screen } from '@/components/Screen';
import { useSessionState } from '@/session/SessionProvider';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const PRACTICES = [
  { time: '3 мин', title: 'Спокойное начало', symbol: '◌' },
  { time: '8 мин', title: 'Глубокий фокус', symbol: '↗' },
  { time: '5 мин', title: 'Мягкое завершение', symbol: '✓' },
] as const;

export function HomeScreen() {
  const state = useSessionState();
  if (state.status === 'hydrating') return null;
  if (state.status !== 'subscribed') return <Redirect href="/onboarding" />;

  return (
    <Screen contentStyle={styles.content} scrollable testID="home-screen">
      <Text style={styles.greeting}>Добрый день</Text>
      <Text accessibilityRole="header" style={styles.title}>
        Что сегодня{`\n`}будет главным?
      </Text>

      <View style={styles.progressCard}>
        <View>
          <Text style={styles.cardEyebrow}>СЕРИЯ ФОКУСА</Text>
          <Text style={styles.progressValue}>7 дней</Text>
          <Text style={styles.progressHint}>Отличный ритм. Продолжайте.</Text>
        </View>
        <View style={styles.progressMark}>
          <Text style={styles.progressMarkText}>7</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Практики на сегодня</Text>
        <Text style={styles.planLabel}>
          {state.plan === 'yearly' ? 'Годовой план' : 'Месячный план'}
        </Text>
      </View>

      <View style={styles.practiceList}>
        {PRACTICES.map((practice) => (
          <View key={practice.title} style={styles.practiceCard}>
            <View style={styles.practiceIcon}>
              <Text style={styles.practiceSymbol}>{practice.symbol}</Text>
            </View>
            <View style={styles.practiceCopy}>
              <Text style={styles.practiceTitle}>{practice.title}</Text>
              <Text style={styles.practiceTime}>{practice.time}</Text>
            </View>
            <Text accessibilityElementsHidden style={styles.arrow}>
              ›
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.xl },
  greeting: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: { ...typography.title, color: colors.ink, marginTop: spacing.sm },
  progressCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    minHeight: 174,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardEyebrow: { ...typography.caption, color: '#B9D8C8', letterSpacing: 1.2 },
  progressValue: { ...typography.title, color: colors.surface, marginTop: spacing.xs },
  progressHint: { ...typography.caption, color: '#D8E6DE', marginTop: spacing.sm },
  progressMark: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressMarkText: { ...typography.title, color: colors.ink },
  sectionHeader: { marginTop: spacing.xl, gap: spacing.xs },
  sectionTitle: { ...typography.heading, color: colors.ink },
  planLabel: { ...typography.caption, color: colors.muted },
  practiceList: { gap: spacing.sm, marginTop: spacing.md, paddingBottom: spacing.lg },
  practiceCard: {
    minHeight: 76,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  practiceIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: '#EEF5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceSymbol: { ...typography.heading, color: colors.primary },
  practiceCopy: { flex: 1, marginLeft: spacing.md },
  practiceTitle: { ...typography.label, color: colors.ink },
  practiceTime: { ...typography.caption, color: colors.muted, marginTop: 2 },
  arrow: { fontSize: 30, color: colors.muted },
});
