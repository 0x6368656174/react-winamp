import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Window from '../window/Window';
import Content from './content/Content';
import './styles.css';
import {
  selectCurrentSong,
  selectState,
  positionChanged,
  durationChanged,
  selectVolume,
  selectBalance,
  selectPosition,
  freqChanged,
} from '../appSlice';

function Player() {
  const currentSong = useSelector(selectCurrentSong);
  const audioRef = useRef<HTMLAudioElement>(null);
  const state = useSelector(selectState);
  const dispatch = useDispatch();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      throw new Error('Not found audio');
    }

    switch (state) {
      case 'paused':
        audio.pause();
        break;
      case 'played':
        audio.play();
        break;
      case 'stopped': {
        audio.pause();
        audio.currentTime = 0;
        break;
      }
    }
  }, [state, audioRef]);

  const volume = useSelector(selectVolume);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      throw new Error('Not found audio');
    }

    audio.volume = volume;
  }, [volume, audioRef]);

  const stereoNodeRef = useRef<StereoPannerNode>();
  const analyserNodeRef = useRef<AnalyserNode>();
  const balance = useSelector(selectBalance);
  useEffect(() => {
    if (!stereoNodeRef.current) {
      const audio = audioRef.current;
      if (!audio) {
        throw new Error('Not found audio');
      }

      const audioContext = new AudioContext();
      const track = audioContext.createMediaElementSource(audio);

      stereoNodeRef.current = new StereoPannerNode(audioContext, { pan: 0 });
      const analyser = new AnalyserNode(audioContext);
      analyserNodeRef.current = analyser;
      track.connect(analyser).connect(stereoNodeRef.current).connect(audioContext.destination);
    }

    stereoNodeRef.current.pan.value = balance / 100;

    let stopAnalyze = false;

    if (state === 'played') {
      requestAnimationFrame(function animate() {
        if (stopAnalyze) {
          return;
        }

        const analyser = analyserNodeRef.current;
        if (!analyser) {
          throw new Error('Not found audio analyzer');
        }

        const freqData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(freqData);

        const result: number[] = [];
        for (let i = 0; i < 19; ++i) {
          const analyserPart = freqData.slice(i * 25, (i + 1) * 25);
          const partSum = analyserPart.reduce((acc, curr) => acc + curr, 0);
          result.push(partSum / (256 * 25));
        }

        dispatch(freqChanged(result));

        requestAnimationFrame(animate);
      });
    }

    return () => {
      stopAnalyze = true;
    };
  }, [audioRef, balance, state, dispatch]);

  const position = useSelector(selectPosition);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      throw new Error('Not found audio');
    }

    if (Math.abs(audio.currentTime - position) > 1) {
      audio.currentTime = position;
    }
  }, [audioRef, position]);

  const updatePosition = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    dispatch(positionChanged(event.currentTarget.currentTime));
  };

  const updateDuration = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    dispatch(durationChanged(event.currentTarget.duration));
  };

  return (
    <div>
      <Window>
        <Content />
      </Window>

      <audio
        ref={audioRef}
        src={currentSong}
        onPlay={updatePosition}
        onSeeked={updatePosition}
        onTimeUpdate={updatePosition}
        onLoadedData={updateDuration}
      />
    </div>
  );
}
export default Player;
