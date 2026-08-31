import { useEffect } from 'react';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';

type GamePhase = 'idle' | 'running' | 'gameOver';

const musicSource = require('../../../../assets/audio/NWA - Fuck The Police.mp3');
const collisionSource = require('../../../../assets/audio/shit.mp3');

export function useGameAudio(phase: GamePhase) {
  const music = useAudioPlayer(musicSource);
  const collisionSound = useAudioPlayer(collisionSource);

  useEffect(() => {
    music.loop = true;
    music.volume = 0.28;
    collisionSound.volume = 0.72;
    void setAudioModeAsync({
      interruptionMode: 'mixWithOthers',
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });
  }, [collisionSound, music]);

  useEffect(() => {
    if (phase === 'running') {
      collisionSound.pause();
      void collisionSound.seekTo(0);
      music.play();
      return;
    }

    music.pause();
    void music.seekTo(0);
    if (phase === 'gameOver') {
      void collisionSound.seekTo(0).then(() => collisionSound.play());
    } else {
      collisionSound.pause();
      void collisionSound.seekTo(0);
    }
  }, [collisionSound, music, phase]);
}
