import { useCallback, useEffect, useRef, useState } from 'react';
import { type LayoutChangeEvent, type TextInput } from 'react-native';
import {
  runOnJS,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';

import {
  advanceLoopPosition,
  CAR_WIDTH,
  getRandomGap,
  getSpeed,
  GRAVITY,
  hasCollision,
  hasPassedCar,
  JUMP_VELOCITY,
  shouldFlipOverCar,
} from './gameEngine';
import { FLIP_DEGREES_PER_SECOND, INITIAL_GAME_WIDTH, MIN_CAR_GAP } from './gameConfig';
import type { GamePhase, JumpKind } from './gameTypes';
import { useGameRecord } from './useGameRecord';

export function useSkaterGame() {
  const width = useSharedValue(INITIAL_GAME_WIDTH);
  const carX = useSharedValue(INITIAL_GAME_WIDTH + MIN_CAR_GAP);
  const cityX = useSharedValue(0);
  const roadX = useSharedValue(0);
  const jumpHeight = useSharedValue(0);
  const verticalVelocity = useSharedValue(0);
  const passedCars = useSharedValue(0);
  const countedCurrentCar = useSharedValue(false);
  const isFlipping = useSharedValue(false);
  const flipRotation = useSharedValue(0);
  const running = useSharedValue(false);
  const scoreRef = useRef<TextInput>(null);
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [score, setScore] = useState(0);
  const { record, saveRecord } = useGameRecord();

  const publishScore = useCallback((nextScore: number) => {
    scoreRef.current?.setNativeProps({ text: `${nextScore} 🚓` });
  }, []);

  const finishGame = useCallback(
    (finalScore: number) => {
      scoreRef.current?.setNativeProps({ text: `${finalScore} 🚓` });
      setScore(finalScore);
      setPhase('gameOver');
      saveRecord(finalScore);
    },
    [saveRecord],
  );

  const frameCallback = useFrameCallback((frame) => {
    'worklet';
    if (!running.value || frame.timeSincePreviousFrame === null) return;

    const delta = Math.min(frame.timeSincePreviousFrame / 1_000, 0.034);
    verticalVelocity.value -= GRAVITY * delta;
    jumpHeight.value = Math.max(0, jumpHeight.value + verticalVelocity.value * delta);
    if (isFlipping.value) {
      flipRotation.value = Math.min(360, flipRotation.value + FLIP_DEGREES_PER_SECOND * delta);
    }
    if (jumpHeight.value === 0) {
      verticalVelocity.value = 0;
      isFlipping.value = false;
      flipRotation.value = 0;
    }

    const speed = getSpeed(passedCars.value);
    carX.value -= speed * delta;
    cityX.value = advanceLoopPosition(cityX.value, speed * 0.16 * delta, width.value);
    roadX.value = advanceLoopPosition(roadX.value, speed * 0.82 * delta, width.value);

    if (!countedCurrentCar.value && hasPassedCar(carX.value)) {
      countedCurrentCar.value = true;
      passedCars.value += 1;
      runOnJS(publishScore)(passedCars.value);
    }

    if (carX.value < -CAR_WIDTH) {
      carX.value = width.value + getRandomGap();
      countedCurrentCar.value = false;
    }

    if (hasCollision(carX.value, jumpHeight.value)) {
      running.value = false;
      runOnJS(finishGame)(passedCars.value);
    }
  });

  useEffect(() => {
    frameCallback.setActive(phase === 'running');
    return () => frameCallback.setActive(false);
  }, [frameCallback, phase]);

  const skaterStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -jumpHeight.value }, { rotateZ: `${flipRotation.value}deg` }],
  }));
  const carStyle = useAnimatedStyle(() => ({ transform: [{ translateX: carX.value }] }));
  const cityStyle = useAnimatedStyle(() => ({ transform: [{ translateX: cityX.value }] }));
  const roadStyle = useAnimatedStyle(() => ({ transform: [{ translateX: roadX.value }] }));

  const startGame = useCallback(() => {
    passedCars.value = 0;
    countedCurrentCar.value = false;
    jumpHeight.value = 0;
    verticalVelocity.value = 0;
    isFlipping.value = false;
    flipRotation.value = 0;
    carX.value = width.value + getRandomGap();
    cityX.value = 0;
    roadX.value = 0;
    running.value = true;
    setScore(0);
    scoreRef.current?.setNativeProps({ text: '0 🚓' });
    setPhase('running');
  }, [
    carX,
    cityX,
    countedCurrentCar,
    flipRotation,
    isFlipping,
    jumpHeight,
    passedCars,
    roadX,
    running,
    verticalVelocity,
    width,
  ]);

  const handlePress = useCallback((): JumpKind => {
    if (!running.value) {
      startGame();
      return 'none';
    }
    if (jumpHeight.value === 0 && verticalVelocity.value === 0) {
      verticalVelocity.value = JUMP_VELOCITY;
      const shouldFlip = shouldFlipOverCar(passedCars.value, carX.value);
      isFlipping.value = shouldFlip;
      flipRotation.value = 0;
      return shouldFlip ? 'flip' : 'regular';
    }
    return 'none';
  }, [
    carX,
    flipRotation,
    isFlipping,
    jumpHeight,
    passedCars,
    running,
    startGame,
    verticalVelocity,
  ]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      width.value = event.nativeEvent.layout.width;
    },
    [width],
  );

  return {
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
  };
}
