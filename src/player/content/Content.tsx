import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from './checkbox/Checkbox';
import styles from './Content.module.css';
import PlaybackControlButton from './playback-contro-button/PlaybackControlButton';
import PositionRange from './position-range/PositionRange';
import Range from './range/Range';
import SongName from './song-name/SongName';
import Status from './status/Status';
import staticMediaInfo from './static-media-info.png';
import winampLogo from './winamp-logo.png';
import {
  play,
  stop,
  pause,
  positionChanged,
  selectPosition,
  selectVolume,
  selectBalance,
  volumeChanged,
  balanceChanged,
  selectDuration,
  selectCurrentSongName,
} from '../../appSlice';

function Content() {
  const duration = useSelector(selectDuration);
  const position = useSelector(selectPosition);
  const volume = useSelector(selectVolume) * 100;
  const balance = useSelector(selectBalance);
  const audioName = useSelector(selectCurrentSongName);

  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.statusAndSongInfo}>
          <div className={styles.status}>
            <Status />
          </div>

          <div className={styles.rightInfo}>
            <SongName name={audioName} />

            <img className={styles.staticMediaInfo} src={staticMediaInfo} alt="Media info" />

            <div className={styles.controls}>
              <div className={styles.volumeControl}>
                <Range
                  value={volume}
                  onChange={(event) =>
                    dispatch(volumeChanged(Number(event.currentTarget.value) / 100))
                  }
                />
              </div>
              <div className={styles.balanceControl}>
                <Range
                  value={balance}
                  min={-100}
                  max={100}
                  onChange={(event) => dispatch(balanceChanged(Number(event.currentTarget.value)))}
                />
              </div>
              <div className={styles.eq}>
                <Checkbox label="eq" />
              </div>
              <div className={styles.pl}>
                <Checkbox label="pl" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.position}>
          <PositionRange
            value={position * 100}
            duration={duration * 100}
            onChange={(event) => {
              dispatch(positionChanged(Number(event.currentTarget.value) / 100));
            }}
          />
        </div>

        <div className={styles.lastRow}>
          <div className={styles.firstPlaybackControls}>
            <PlaybackControlButton type="prev" />
            <PlaybackControlButton type="play" onClick={() => dispatch(play())} />
            <PlaybackControlButton type="pause" onClick={() => dispatch(pause())} />
            <PlaybackControlButton type="stop" onClick={() => dispatch(stop())} />
            <PlaybackControlButton type="next" />
          </div>

          <div className={styles.ejectControl}>
            <PlaybackControlButton type="eject" />
          </div>

          <div className={styles.shuffle}>
            <Checkbox label="shuffle" />
          </div>

          <div className={styles.repeat}>
            <Checkbox label="repeat" />
          </div>

          <img className={styles.winampLogo} src={winampLogo} alt="WINAMP logo" />
        </div>
      </div>
    </div>
  );
}

export default Content;
