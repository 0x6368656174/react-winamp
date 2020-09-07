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
import staticMediaInfoStopped from './static-media-info-stopped.png';
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
  selectCurrentSong,
  nextSong,
  selectShuffleEnabled,
  selectRepeatEnabled,
  shuffleEnabledChanged,
  repeatEnabledChanged,
  selectState,
  messageTextChanged,
  selectMessageText,
  selectCurrentSongNumber,
  selectPlaylistVisible,
  playlistVisibleChanged,
} from '../../appSlice';

function Content() {
  const duration = useSelector(selectDuration);
  const position = useSelector(selectPosition);
  const volume = useSelector(selectVolume) * 100;
  const balance = useSelector(selectBalance);
  const currentSongNumber = useSelector(selectCurrentSongNumber);
  const currentSong = useSelector(selectCurrentSong);
  const shuffleEnabled = useSelector(selectShuffleEnabled);
  const repeatEnabled = useSelector(selectRepeatEnabled);
  const isStopped = useSelector(selectState) === 'stopped';
  const messageText = useSelector(selectMessageText);
  const playlistVisible = useSelector(selectPlaylistVisible);

  const dispatch = useDispatch();

  const handleVolumeMouseDown = (event: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(messageTextChanged(`VOLUME: ${Math.floor(Number(event.currentTarget.value))}%`));
  };
  const handleVolumeMouseUp = (event: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(messageTextChanged(''));
  };
  const handleBalanceMouseDown = (event: React.SyntheticEvent<HTMLInputElement>) => {
    let balanceText = 'CENTER';
    const value = Math.floor(Number(event.currentTarget.value));
    if (value < 0) {
      balanceText = `${-1 * value}% LEFT`;
    } else if (value > 0) {
      balanceText = `${value}% RIGHT`;
    }

    dispatch(messageTextChanged(`BALANCE: ${balanceText}`));
  };
  const handleBalanceMouseUp = (event: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(messageTextChanged(''));
  };

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.statusAndSongInfo}>
          <div className={styles.status}>
            <Status />
          </div>

          <div className={styles.rightInfo}>
            <div className={styles.songName}>
              <SongName
                name={currentSongNumber + 1 + '. ' + currentSong.name}
                messageText={messageText}
              />
            </div>

            <img
              className={styles.staticMediaInfo}
              src={isStopped ? staticMediaInfoStopped : staticMediaInfo}
              alt="Media info"
            />

            <div className={styles.controls}>
              <div className={styles.volumeControl}>
                <Range
                  value={volume}
                  onChange={(event) =>
                    dispatch(volumeChanged(Number(event.currentTarget.value) / 100))
                  }
                  onMouseDown={handleVolumeMouseDown}
                  onMouseUp={handleVolumeMouseUp}
                />
              </div>
              <div className={styles.balanceControl}>
                <Range
                  value={balance}
                  min={-100}
                  max={100}
                  onChange={(event) => dispatch(balanceChanged(Number(event.currentTarget.value)))}
                  onMouseDown={handleBalanceMouseDown}
                  onMouseUp={handleBalanceMouseUp}
                />
              </div>
              <div className={styles.eq}>
                <Checkbox label="eq" />
              </div>
              <div className={styles.pl}>
                <Checkbox
                  label="pl"
                  value={playlistVisible}
                  onChange={(value) => dispatch(playlistVisibleChanged(value))}
                />
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
            <PlaybackControlButton type="prev" onClick={() => dispatch(nextSong(-1))} />
            <PlaybackControlButton type="play" onClick={() => dispatch(play())} />
            <PlaybackControlButton type="pause" onClick={() => dispatch(pause())} />
            <PlaybackControlButton type="stop" onClick={() => dispatch(stop())} />
            <PlaybackControlButton type="next" onClick={() => dispatch(nextSong(1))} />
          </div>

          <div className={styles.ejectControl}>
            <PlaybackControlButton type="eject" />
          </div>

          <div className={styles.shuffle}>
            <Checkbox
              label="shuffle"
              value={shuffleEnabled}
              onChange={(value) => dispatch(shuffleEnabledChanged(value))}
            />
          </div>

          <div className={styles.repeat}>
            <Checkbox
              label="repeat"
              value={repeatEnabled}
              onChange={(value) => dispatch(repeatEnabledChanged(value))}
            />
          </div>

          <img className={styles.winampLogo} src={winampLogo} alt="WINAMP logo" />
        </div>
      </div>
    </div>
  );
}

export default Content;
