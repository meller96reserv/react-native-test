import { memo } from 'react';
import {
  Pressable,
  StyleSheet,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { gamePalette } from '../gameConfig';
import type { GamePhase } from '../gameTypes';
import { CityBackground } from './CityBackground';
import { GameOverlay } from './GameOverlay';
import { PoliceCarSprite } from './PoliceCarSprite';
import { Road } from './Road';
import { SkaterSprite } from './SkaterSprite';

type GameSceneProps = {
  carStyle: StyleProp<ViewStyle>;
  cityStyle: StyleProp<ViewStyle>;
  onLayout: (event: LayoutChangeEvent) => void;
  onPress: () => void;
  phase: GamePhase;
  roadStyle: StyleProp<ViewStyle>;
  score: number;
  skaterStyle: StyleProp<ViewStyle>;
};

export const GameScene = memo(function GameScene({
  carStyle,
  cityStyle,
  onLayout,
  onPress,
  phase,
  roadStyle,
  score,
  skaterStyle,
}: GameSceneProps) {
  const gameOver = phase === 'gameOver';

  return (
    <Pressable
      accessibilityHint="Во время игры заставляет скейтера прыгнуть"
      accessibilityLabel={
        gameOver ? `Игра окончена. Счёт ${score}. Начать заново` : 'Мини-игра Skate escape'
      }
      accessibilityRole="button"
      onLayout={onLayout}
      onPress={onPress}
      style={styles.game}
    >
      <CityBackground animatedStyle={cityStyle} />
      <Road animatedStyle={roadStyle} />
      <SkaterSprite animatedStyle={skaterStyle} />
      <PoliceCarSprite animatedStyle={carStyle} hidden={phase === 'idle'} />
      <GameOverlay phase={phase} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  game: {
    flex: 1,
    minHeight: 320,
    backgroundColor: gamePalette.sky,
    overflow: 'hidden',
  },
});
