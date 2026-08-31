import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type LayoutChangeEvent, type View } from 'react-native';

import {
  CAR_WIDTH,
  getRandomGap,
  getSpeed,
  hasCollision,
  startJump,
  updatePhysics,
  type PhysicsState,
} from './gameEngine';

const RECORD_KEY = '@focus-flow/skater-record';
const INITIAL_WIDTH = 320;
type GamePhase = 'idle' | 'running' | 'gameOver';

export function useSkaterGame() {
  const skaterRef = useRef<View>(null);
  const carRef = useRef<View>(null);
  const frameRef = useRef<number | null>(null);
  const phaseRef = useRef<GamePhase>('idle');
  const lastTimeRef = useRef(0);
  const widthRef = useRef(INITIAL_WIDTH);
  const carXRef = useRef(INITIAL_WIDTH + 180);
  const physicsRef = useRef<PhysicsState>({ jumpHeight: 0, verticalVelocity: 0 });
  const distanceRef = useRef(0);
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(0);

  useEffect(() => {
    void AsyncStorage.getItem(RECORD_KEY).then((stored) => {
      const parsed = Number(stored);
      if (Number.isSafeInteger(parsed) && parsed > 0) setRecord(parsed);
    });
  }, []);

  const placeSprites = useCallback(() => {
    skaterRef.current?.setNativeProps({
      style: { transform: [{ translateY: -physicsRef.current.jumpHeight }] },
    });
    carRef.current?.setNativeProps({
      style: { transform: [{ translateX: carXRef.current }] },
    });
  }, []);

  const finishGame = useCallback((finalScore: number) => {
    phaseRef.current = 'gameOver';
    setPhase('gameOver');
    setRecord((currentRecord) => {
      if (finalScore <= currentRecord) return currentRecord;
      void AsyncStorage.setItem(RECORD_KEY, String(finalScore));
      return finalScore;
    });
  }, []);

  const tick = useCallback(
    (timestamp: number) => {
      if (phaseRef.current !== 'running') return;
      if (AppState.currentState !== 'active') {
        lastTimeRef.current = timestamp;
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = lastTimeRef.current === 0 ? 0 : (timestamp - lastTimeRef.current) / 1_000;
      const delta = Math.min(elapsed, 0.034);
      lastTimeRef.current = timestamp;

      physicsRef.current = updatePhysics(physicsRef.current, delta);
      const speed = getSpeed(Math.floor(distanceRef.current));
      carXRef.current -= speed * delta;
      distanceRef.current += delta * (speed / 42);

      if (carXRef.current < -CAR_WIDTH) carXRef.current = widthRef.current + getRandomGap();

      const nextScore = Math.floor(distanceRef.current);
      setScore((current) => (current === nextScore ? current : nextScore));
      placeSprites();

      if (hasCollision(carXRef.current, physicsRef.current.jumpHeight)) {
        finishGame(nextScore);
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    },
    [finishGame, placeSprites],
  );

  const startGame = useCallback(() => {
    distanceRef.current = 0;
    physicsRef.current = { jumpHeight: 0, verticalVelocity: 0 };
    carXRef.current = widthRef.current + getRandomGap();
    lastTimeRef.current = 0;
    setScore(0);
    setPhase('running');
    phaseRef.current = 'running';
    placeSprites();
    frameRef.current = requestAnimationFrame(tick);
  }, [placeSprites, tick]);

  const handlePress = useCallback(() => {
    if (phaseRef.current !== 'running') {
      startGame();
      return;
    }
    physicsRef.current = startJump(physicsRef.current);
  }, [startGame]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    widthRef.current = event.nativeEvent.layout.width;
  }, []);

  useEffect(
    () => () => {
      phaseRef.current = 'idle';
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  return { carRef, handleLayout, handlePress, phase, record, score, skaterRef };
}
