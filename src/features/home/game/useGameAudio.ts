import { useCallback, useEffect } from 'react';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';

import type { GamePhase } from './gameTypes';

const musicSource = require('../../../../assets/audio/NWA - Fuck The Police.mp3');
const collisionSource = require('../../../../assets/audio/shit.mp3');
const jumpSource = require('../../../../assets/audio/jump.mp3');
const cheerSource = require('../../../../assets/audio/Yahoo.mp3');

export function useGameAudio(phase: GamePhase) {
  const music = useAudioPlayer(musicSource);
  const collisionSound = useAudioPlayer(collisionSource);
  const jumpSound = useAudioPlayer(jumpSource);
  const cheerSound = useAudioPlayer(cheerSource);

  useEffect(() => {
    music.loop = true;
    music.volume = 0.28;
    collisionSound.volume = 0.72;
    jumpSound.volume = 0.7;
    cheerSound.volume = 0.9;
    void setAudioModeAsync({
      interruptionMode: 'mixWithOthers',
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });
  }, [cheerSound, collisionSound, jumpSound, music]);

  useEffect(() => {
    if (phase === 'running') {
      collisionSound.pause();
      void collisionSound.seekTo(0);
      music.play();
      return;
    }

    music.pause();
    jumpSound.pause();
    cheerSound.pause();
    void jumpSound.seekTo(0);
    void cheerSound.seekTo(0);
    void music.seekTo(0);
    if (phase === 'gameOver') {
      void collisionSound.seekTo(0).then(() => collisionSound.play());
    } else {
      collisionSound.pause();
      void collisionSound.seekTo(0);
    }
  }, [cheerSound, collisionSound, jumpSound, music, phase]);

  const playJump = useCallback(() => {
    if (phase !== 'running') return;
    void jumpSound.seekTo(0).then(() => jumpSound.play());
  }, [jumpSound, phase]);

  const cheer = useCallback(() => {
    if (phase !== 'running') return;
    void cheerSound.seekTo(0).then(() => cheerSound.play());
  }, [cheerSound, phase]);

  return { cheer, playJump };
}
