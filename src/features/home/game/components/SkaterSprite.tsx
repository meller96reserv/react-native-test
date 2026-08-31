import { memo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors } from '@/theme/tokens';

import { GROUND_OFFSET, SKATER_WIDTH, SKATER_X } from '../gameEngine';
import { gamePalette } from '../gameConfig';

type SkaterSpriteProps = { animatedStyle: StyleProp<ViewStyle> };

export const SkaterSprite = memo(function SkaterSprite({ animatedStyle }: SkaterSpriteProps) {
  return (
    <Animated.View style={[styles.skater, animatedStyle]}>
      <View style={styles.capCrown} />
      <View style={styles.capVisor} />
      <View style={styles.head} />
      <View style={styles.body} />
      <View style={styles.armFront} />
      <View style={styles.armBack} />
      <View style={styles.legFront} />
      <View style={styles.legBack} />
      <View style={styles.board}>
        <View style={styles.wheel} />
        <View style={[styles.wheel, styles.wheelRight]} />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  skater: {
    position: 'absolute',
    left: SKATER_X,
    bottom: GROUND_OFFSET,
    width: SKATER_WIDTH,
    height: 66,
  },
  head: {
    position: 'absolute',
    width: 14,
    height: 16,
    borderRadius: 7,
    top: 7,
    left: 14,
    backgroundColor: gamePalette.skin,
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
  body: {
    position: 'absolute',
    width: 15,
    height: 24,
    top: 21,
    left: 13,
    borderRadius: 6,
    backgroundColor: colors.primary,
    transform: [{ rotate: '-5deg' }],
  },
  armFront: {
    position: 'absolute',
    width: 20,
    height: 5,
    top: 27,
    left: 23,
    borderRadius: 3,
    backgroundColor: gamePalette.skin,
    transform: [{ rotate: '18deg' }],
  },
  armBack: {
    position: 'absolute',
    width: 17,
    height: 5,
    top: 29,
    left: 2,
    borderRadius: 3,
    backgroundColor: gamePalette.skin,
    transform: [{ rotate: '-18deg' }],
  },
  legFront: {
    position: 'absolute',
    width: 22,
    height: 7,
    top: 43,
    left: 20,
    borderRadius: 4,
    backgroundColor: colors.ink,
    transform: [{ rotate: '18deg' }],
  },
  legBack: {
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
});
