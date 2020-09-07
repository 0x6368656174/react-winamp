import React from 'react';
import styles from './Time.module.css';

interface TimePros {
  position: number;
  duration: number;
  showTimeLeft: boolean;
  state?: 'played' | 'stopped' | 'paused';
  onClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
}

function Time(props: TimePros) {
  const isPaused = props.state === 'paused';
  const isStopped = props.state === 'stopped';

  const images = timeToImages(
    props.showTimeLeft ? props.duration - props.position : props.position,
    props.showTimeLeft
  );

  return (
    <div className={styles.time} onClick={props.onClick}>
      {props.showTimeLeft ? (
        <div className={styles.dash}>-</div>
      ) : (
        <div className={styles.noDash} />
      )}

      <div
        className={[
          styles.number,
          isPaused ? styles.isPause : '',
          styles.firstNumber,
          isStopped ? styles.isStop : '',
          styles['number' + images[0]],
        ].join(' ')}
      >
        {images[0]}
      </div>
      <div
        className={[
          styles.number,
          isPaused ? styles.isPause : '',
          isStopped ? styles.isStop : '',
          styles['number' + images[1]],
        ].join(' ')}
      >
        {images[1]}
      </div>
      <div className={styles.dots}>:</div>
      <div
        className={[
          styles.number,
          isPaused ? styles.isPause : '',
          isStopped ? styles.isStop : '',
          styles.firstNumber,
          styles['number' + images[2]],
        ].join(' ')}
      >
        {images[2]}
      </div>
      <div
        className={[
          styles.number,
          isPaused ? styles.isPause : '',
          isStopped ? styles.isStop : '',
          styles['number' + images[3]],
        ].join(' ')}
      >
        {images[3]}
      </div>
    </div>
  );
}

function timeToImages(time: number, secondsCeil: boolean): [number, number, number, number] {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return [
    Math.floor(minutes / 10),
    Math.floor(minutes % 10),
    Math.floor(seconds / 10),
    secondsCeil ? Math.ceil(seconds % 10) : Math.floor(seconds % 10),
  ];
}

export default Time;
