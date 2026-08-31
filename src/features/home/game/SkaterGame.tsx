import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme/tokens';
import type { SubscriptionPlan } from '@/session/types';

import { CAR_WIDTH, GROUND_OFFSET, SKATER_X } from './gameEngine';
import { useGameAudio } from './useGameAudio';
import { useSkaterGame } from './useSkaterGame';

const ROAD_MARKERS = Array.from({ length: 7 }, (_, index) => index);

type SkaterGameProps = { plan: SubscriptionPlan };

export const SkaterGame = memo(function SkaterGame({ plan }: SkaterGameProps) {
  const { carRef, handleLayout, handlePress, phase, record, score, skaterRef } = useSkaterGame();
  useGameAudio(phase);
  const idle = phase === 'idle';
  const gameOver = phase === 'gameOver';

  return (
    <View style={styles.section}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.title}>Skate escape</Text>
          <Text
            accessibilityLabel={`Активная подписка: ${plan === 'yearly' ? 'год' : 'месяц'}`}
            style={styles.plan}
          >
            SKATE PASS · {plan === 'yearly' ? 'ГОД' : 'МЕСЯЦ'}
          </Text>
        </View>
        <Text accessibilityLiveRegion="polite" style={styles.score}>
          {score} м
        </Text>
      </View>

      <Pressable
        accessibilityHint="Во время игры заставляет скейтера прыгнуть"
        accessibilityLabel={
          gameOver ? `Игра окончена. Счёт ${score}. Начать заново` : 'Мини-игра Skate escape'
        }
        accessibilityRole="button"
        onLayout={handleLayout}
        onPress={handlePress}
        style={({ pressed }) => [styles.game, pressed && styles.pressed]}
      >
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          source={require('../../../../assets/images/image.png')}
          style={styles.cityBackground}
        />
        <View style={styles.road}>
          <View style={styles.roadMarkings}>
            {ROAD_MARKERS.map((marker) => (
              <View key={marker} style={styles.roadLine} />
            ))}
          </View>
        </View>

        <View ref={skaterRef} style={styles.skater}>
          <View style={styles.capCrown} />
          <View style={styles.capVisor} />
          <View style={styles.skaterHead} />
          <View style={styles.skaterBody} />
          <View style={styles.skaterArm} />
          <View style={styles.skaterArmBack} />
          <View style={styles.skaterLegFront} />
          <View style={styles.skaterLegBack} />
          <View style={styles.board}>
            <View style={styles.wheel} />
            <View style={[styles.wheel, styles.wheelRight]} />
          </View>
        </View>

        <View ref={carRef} style={[styles.car, idle && styles.hidden]}>
          <View style={styles.lights}>
            <View style={styles.redLight} />
            <View style={styles.blueLight} />
          </View>
          <View style={styles.carCabin} />
          <View style={styles.carBody}>
            <Text style={styles.policeLabel}>POLICE</Text>
          </View>
          <View style={styles.carWheel} />
          <View style={[styles.carWheel, styles.carWheelRight]} />
        </View>

        {idle || gameOver ? (
          <View style={styles.overlay} pointerEvents="none">
            <View style={styles.overlayCard}>
              <Text style={styles.overlayTitle}>{gameOver ? 'Пойман!' : 'Готов к побегу?'}</Text>
              <Text style={styles.overlayHint}>
                {gameOver ? 'Тап — ещё попытка' : 'Тап — старт и прыжок'}
              </Text>
            </View>
          </View>
        ) : null}
      </Pressable>

      <View style={styles.recordRow}>
        <Text style={styles.recordLabel}>Рекорд</Text>
        <Text style={styles.recordValue}>{record} м</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  section: { flex: 1 },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: { ...typography.heading, color: colors.ink },
  plan: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
    letterSpacing: 0.8,
  },
  score: { ...typography.label, color: colors.primary, fontVariant: ['tabular-nums'] },
  game: {
    flex: 1,
    minHeight: 320,
    backgroundColor: '#190B2D',
    overflow: 'hidden',
  },
  pressed: { opacity: 0.96 },
  hidden: { opacity: 0 },
  cityBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 74,
    left: 0,
  },
  road: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 74,
    backgroundColor: '#2A1A3B',
    borderTopWidth: 4,
    borderTopColor: '#7441A5',
  },
  roadMarkings: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 42,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roadLine: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  skater: { position: 'absolute', left: SKATER_X, bottom: GROUND_OFFSET, width: 42, height: 66 },
  skaterHead: {
    position: 'absolute',
    width: 14,
    height: 16,
    borderRadius: 7,
    top: 7,
    left: 14,
    backgroundColor: '#E4A67A',
  },
  capCrown: {
    position: 'absolute',
    zIndex: 2,
    width: 17,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    top: 3,
    left: 12,
    backgroundColor: colors.accent,
  },
  capVisor: {
    position: 'absolute',
    zIndex: 3,
    width: 11,
    height: 4,
    borderRadius: 2,
    top: 9,
    left: 22,
    backgroundColor: colors.accent,
    transform: [{ rotate: '8deg' }],
  },
  skaterBody: {
    position: 'absolute',
    width: 15,
    height: 24,
    top: 21,
    left: 13,
    borderRadius: 6,
    backgroundColor: colors.primary,
    transform: [{ rotate: '-5deg' }],
  },
  skaterArm: {
    position: 'absolute',
    width: 20,
    height: 5,
    top: 27,
    left: 23,
    borderRadius: 3,
    backgroundColor: '#E4A67A',
    transform: [{ rotate: '18deg' }],
  },
  skaterArmBack: {
    position: 'absolute',
    width: 17,
    height: 5,
    top: 29,
    left: 2,
    borderRadius: 3,
    backgroundColor: '#E4A67A',
    transform: [{ rotate: '-18deg' }],
  },
  skaterLegFront: {
    position: 'absolute',
    width: 22,
    height: 7,
    top: 43,
    left: 20,
    borderRadius: 4,
    backgroundColor: colors.ink,
    transform: [{ rotate: '18deg' }],
  },
  skaterLegBack: {
    position: 'absolute',
    width: 22,
    height: 7,
    top: 44,
    left: 4,
    borderRadius: 4,
    backgroundColor: colors.ink,
    transform: [{ rotate: '-10deg' }],
  },
  board: {
    position: 'absolute',
    width: 40,
    height: 5,
    bottom: 8,
    left: 1,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  wheel: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    top: 4,
    left: 7,
    backgroundColor: colors.ink,
  },
  wheelRight: { left: 28 },
  car: { position: 'absolute', left: 0, bottom: GROUND_OFFSET - 1, width: CAR_WIDTH, height: 48 },
  lights: { position: 'absolute', zIndex: 2, top: 2, left: 22, flexDirection: 'row' },
  redLight: { width: 8, height: 5, backgroundColor: '#E04C4C' },
  blueLight: { width: 8, height: 5, backgroundColor: '#427BD8' },
  carCabin: {
    position: 'absolute',
    width: 34,
    height: 21,
    top: 7,
    left: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 12,
    backgroundColor: '#F6F8F7',
    borderWidth: 3,
    borderColor: '#28332E',
  },
  carBody: {
    position: 'absolute',
    width: CAR_WIDTH,
    height: 25,
    bottom: 5,
    borderRadius: 7,
    backgroundColor: '#F6F8F7',
    borderWidth: 3,
    borderColor: '#28332E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  policeLabel: { fontSize: 8, fontWeight: '900', color: '#26322C' },
  carWheel: {
    position: 'absolute',
    width: 11,
    height: 11,
    borderRadius: 6,
    bottom: 0,
    left: 8,
    backgroundColor: '#07030D',
    borderWidth: 2,
    borderColor: '#DCC9EE',
  },
  carWheelRight: { left: 40 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 3, 15, 0.48)',
  },
  overlayCard: {
    minWidth: 230,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: 'rgba(29, 16, 44, 0.94)',
  },
  overlayTitle: {
    ...typography.display,
    color: colors.accent,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  overlayHint: { ...typography.label, color: colors.ink, marginTop: spacing.xs },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  recordLabel: { ...typography.caption, color: colors.muted },
  recordValue: { ...typography.label, color: colors.ink, fontVariant: ['tabular-nums'] },
});
