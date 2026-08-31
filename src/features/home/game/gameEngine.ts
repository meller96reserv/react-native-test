export const GAME_HEIGHT = 224;
export const GROUND_OFFSET = 34;
export const SKATER_X = 34;
export const SKATER_WIDTH = 42;
export const CAR_WIDTH = 58;
export const CAR_COLLISION_HEIGHT = 38;

const BASE_SPEED = 190;
const MAX_SPEED = 340;
const GRAVITY = 1_700;
const JUMP_VELOCITY = 650;

export type PhysicsState = { jumpHeight: number; verticalVelocity: number };

export function getSpeed(score: number) {
  return Math.min(MAX_SPEED, BASE_SPEED + score * 0.8);
}

export function startJump(state: PhysicsState): PhysicsState {
  if (state.jumpHeight > 0 || state.verticalVelocity !== 0) return state;
  return { jumpHeight: 0, verticalVelocity: JUMP_VELOCITY };
}

export function updatePhysics(state: PhysicsState, deltaSeconds: number): PhysicsState {
  const verticalVelocity = state.verticalVelocity - GRAVITY * deltaSeconds;
  const jumpHeight = Math.max(0, state.jumpHeight + verticalVelocity * deltaSeconds);
  return jumpHeight === 0
    ? { jumpHeight: 0, verticalVelocity: 0 }
    : { jumpHeight, verticalVelocity };
}

export function hasCollision(carX: number, jumpHeight: number) {
  const overlapsHorizontally =
    carX < SKATER_X + SKATER_WIDTH - 8 && carX + CAR_WIDTH > SKATER_X + 8;
  return overlapsHorizontally && jumpHeight < CAR_COLLISION_HEIGHT;
}

export function getRandomGap(random = Math.random) {
  return 150 + Math.round(random() * 190);
}

export function advanceLoopPosition(position: number, distance: number, loopWidth: number) {
  const nextPosition = position - distance;
  return nextPosition <= -loopWidth ? nextPosition + loopWidth : nextPosition;
}
