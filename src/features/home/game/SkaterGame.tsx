import { memo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { SubscriptionPlan } from '@/session/types';
import { colors, spacing, typography } from '@/theme/tokens';

import { GameHud } from './components/GameHud';
import { GameScene } from './components/GameScene';
import { useGameAudio } from './useGameAudio';
import { useSkaterGame } from './useSkaterGame';

type SkaterGameProps = { plan: SubscriptionPlan };

export const SkaterGame = memo(function SkaterGame({ plan }: SkaterGameProps) {
  const {
    carStyle,
    cityStyle,
    handleLayout,
    handlePress,
    phase,
    record,
    roadStyle,
    score,
    scoreRef,
    skaterStyle,
  } = useSkaterGame();
  const { cheer, playJump } = useGameAudio(phase);

  const handleGamePress = useCallback(() => {
    const jumpKind = handlePress();
    if (jumpKind === 'none') return;
    playJump();
    if (jumpKind === 'flip') cheer();
  }, [cheer, handlePress, playJump]);

  return (
    <View style={styles.section}>
      <GameHud plan={plan} scoreRef={scoreRef} />
      <GameScene
        carStyle={carStyle}
        cityStyle={cityStyle}
        onLayout={handleLayout}
        onPress={handleGamePress}
        phase={phase}
        roadStyle={roadStyle}
        score={score}
        skaterStyle={skaterStyle}
      />
      <View style={styles.recordRow}>
        <Text style={styles.recordLabel}>Рекорд</Text>
        <Text style={styles.recordValue}>{record} 🚓</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  section: { flex: 1 },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  recordLabel: { ...typography.caption, color: colors.muted },
  recordValue: { ...typography.label, color: colors.ink, fontVariant: ['tabular-nums'] },
});
