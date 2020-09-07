import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GraphicVisualize from '../graphic-visualize/GraphicVisualize';
import Time from '../time/Time';
import styles from './Status.module.css';
import lcd from './lcd-side-letters.png';
import {
  selectState,
  selectPosition,
  selectShowTimeLeft,
  selectDuration,
  showTimeLeftToggled,
  selectFreq,
} from '../../../appSlice';

function Status() {
  const duration = useSelector(selectDuration);
  const position = useSelector(selectPosition);
  const freq = useSelector(selectFreq);
  const isPlayed = useSelector(selectState) === 'played';
  const showTimeLeft = useSelector(selectShowTimeLeft);

  const dispatch = useDispatch();

  return (
    <div className={['withBorder', styles.status].join(' ')}>
      <img className={styles.lcd} src={lcd} alt="LCD buttons" />
      <button
        className={[styles.button, isPlayed ? styles.buttonPause : styles.buttonPlay].join(' ')}
      >
        Play
      </button>
      <div className={styles.time}>
        <Time
          position={position}
          duration={duration}
          showTimeLeft={showTimeLeft}
          onClick={() => dispatch(showTimeLeftToggled())}
        />
      </div>
      <div className={styles.vu}>
        <GraphicVisualize columns={freq} />
      </div>
    </div>
  );
}

export default Status;
