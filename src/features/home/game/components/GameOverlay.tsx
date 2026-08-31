import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme/tokens';

import type { GamePhase } from '../gameTypes';

type GameOverlayProps = { phase: GamePhase };

export const GameOverlay = memo(function GameOverlay({ phase }: GameOverlayProps) {
  if (phase === 'running') return null;
  const gameOver = phase === 'gameOver';

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.card}>
        <Text style={styles.title}>{gameOver ? 'Пойман!' : 'Готов к побегу?'}</Text>
        <Text style={styles.hint}>{gameOver ? 'Тап — ещё попытка' : 'Тап — старт и прыжок'}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 3, 15, 0.48)',
  },
  card: {
    minWidth: 230,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: 'rgba(29, 16, 44, 0.94)',
  },
  title: {
    ...typography.display,
    color: colors.accent,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  hint: { ...typography.label, color: colors.ink, marginTop: spacing.xs },
});
