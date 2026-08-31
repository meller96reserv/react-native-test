import { useEffect } from 'react';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';

type GamePhase = 'idle' | 'running' | 'gameOver';

const musicSource = require('../../../../assets/audio/NWA - Fuck The Police.mp3');
const collisionSource = require('../../../../assets/audio/shit.mp3');
const jumpSource = require('../../../../assets/audio/jump.mp3');

export function useGameAudio(phase: GamePhase, jumpSequence: number) {
  const music = useAudioPlayer(musicSource);
  const collisionSound = useAudioPlayer(collisionSource);
  const jumpSound = useAudioPlayer(jumpSource);

  useEffect(() => {
    music.loop = true;
    music.volume = 0.28;
    collisionSound.volume = 0.72;
    jumpSound.volume = 0.7;
    void setAudioModeAsync({
      interruptionMode: 'mixWithOthers',
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });
  }, [collisionSound, jumpSound, music]);

  useEffect(() => {
    if (phase === 'running') {
      collisionSound.pause();
      void collisionSound.seekTo(0);
      music.play();
      return;
    }

    music.pause();
    jumpSound.pause();
    void jumpSound.seekTo(0);
    void music.seekTo(0);
    if (phase === 'gameOver') {
      void collisionSound.seekTo(0).then(() => collisionSound.play());
    } else {
      collisionSound.pause();
      void collisionSound.seekTo(0);
    }
  }, [collisionSound, jumpSound, music, phase]);

  useEffect(() => {
    if (phase !== 'running' || jumpSequence === 0) return;
    void jumpSound.seekTo(0).then(() => jumpSound.play());
  }, [jumpSequence, jumpSound, phase]);
}
