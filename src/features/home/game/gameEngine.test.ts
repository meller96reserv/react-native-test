import {
  advanceLoopPosition,
  getRandomGap,
  getSpeed,
  hasCollision,
  startJump,
  updatePhysics,
} from './gameEngine';

describe('skater game engine', () => {
  it('starts and completes a jump', () => {
    const jumping = startJump({ jumpHeight: 0, verticalVelocity: 0 });
    expect(jumping.verticalVelocity).toBeGreaterThan(0);

    let state = jumping;
    for (let frame = 0; frame < 120; frame += 1) state = updatePhysics(state, 1 / 60);
    expect(state).toEqual({ jumpHeight: 0, verticalVelocity: 0 });
  });

  it('does not allow a second jump in the air', () => {
    const state = { jumpHeight: 20, verticalVelocity: 100 };
    expect(startJump(state)).toBe(state);
    const justStarted = { jumpHeight: 0, verticalVelocity: 650 };
    expect(startJump(justStarted)).toBe(justStarted);
  });

  it('detects only low, overlapping collisions', () => {
    expect(hasCollision(50, 0)).toBe(true);
    expect(hasCollision(50, 60)).toBe(false);
    expect(hasCollision(200, 0)).toBe(false);
  });

  it('keeps difficulty and obstacle gaps bounded', () => {
    expect(getSpeed(0)).toBe(190);
    expect(getSpeed(10_000)).toBe(340);
    expect(getRandomGap(() => 0)).toBe(150);
    expect(getRandomGap(() => 1)).toBe(340);
  });

  it('wraps the city background without a visible stop', () => {
    expect(advanceLoopPosition(-90, 20, 100)).toBe(-10);
    expect(advanceLoopPosition(-20, 15, 100)).toBe(-35);
  });
});
