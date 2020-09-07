import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './PlaybackControls.module.css';
import { play, pause, stop, nextSong } from '../../../appSlice';

function PlaybackControls() {
  const dispatch = useDispatch();

  return (
    <div>
      <button className={styles.prev} onClick={() => dispatch(nextSong(-1))}>
        Prev
      </button>
      <button className={styles.play} onClick={() => dispatch(play())}>
        Play
      </button>
      <button className={styles.pause} onClick={() => dispatch(pause())}>
        Pause
      </button>
      <button className={styles.stop} onClick={() => dispatch(stop())}>
        Stop
      </button>
      <button className={styles.next} onClick={() => dispatch(nextSong(1))}>
        Next
      </button>
      <button className={styles.eject}>Eject</button>
    </div>
  );
}

export default PlaybackControls;
