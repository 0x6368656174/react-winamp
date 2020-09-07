import React from 'react';
import styles from './PlaybackControlButton.module.css';

interface PlaybackControlButtonProps {
  type: 'prev' | 'play' | 'pause' | 'stop' | 'next' | 'eject';
  onClick?: (event: React.SyntheticEvent) => void;
}

function PlaybackControlButton(props: PlaybackControlButtonProps) {
  return (
    <button
      className={[styles.playbackControl, styles[props.type]].join(' ')}
      onClick={props.onClick}
    >
      {props.type}
    </button>
  );
}

export default PlaybackControlButton;
