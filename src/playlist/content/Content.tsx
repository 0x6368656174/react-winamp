import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Content.module.css';
import FileList from './file-list/FileList';
import buttonGroup from './button-group.png';
import buttonListOption from './button-list-option.png';
import PlaybackControls from './playback-controls/PlaybackControls';
import scroll from './scroll.png';
import resizeCorner from './resize-corner.png';
import TextField from './text-field/TextField';
import {
  selectCurrentSongNumber,
  selectDuration,
  selectPlaylist,
  selectPosition,
  selectShowTimeLeft,
  selectTotalDuration,
  currentSongChanged,
} from '../../appSlice';
import { durationString } from './utils';

function Content() {
  const showTimeLeft = useSelector(selectShowTimeLeft);
  const duration = useSelector(selectDuration) ?? 0;
  const position = useSelector(selectPosition) ?? 0;
  const durationText =
    (showTimeLeft ? '-' : '') +
    durationString(showTimeLeft ? duration - position : position, showTimeLeft);
  const playlist = useSelector(selectPlaylist);
  const totalDuration = useSelector(selectTotalDuration);
  const currentSongNumber = useSelector(selectCurrentSongNumber);
  const dispatch = useDispatch();

  const handleSongSelect = (filePath: string) => {
    const songNumber = playlist.findIndex((file) => file.path === filePath);
    if (songNumber === -1) {
      throw new Error('Not found song');
    }

    dispatch(currentSongChanged(songNumber));
  };

  return (
    <div className={styles.content}>
      <div className={styles.fileList}>
        <FileList
          files={playlist}
          currentFileNumber={currentSongNumber}
          onSelected={handleSongSelect}
        />
      </div>
      <img className={styles.buttonGroup} src={buttonGroup} alt="Bottom buttons" />
      <div className={styles.playbackControls}>
        <div className={styles.playDuration}>
          <TextField>
            {durationString(duration)} / {durationString(totalDuration)}
          </TextField>
        </div>
        <div className={styles.row}>
          <div className={styles.controlButtons}>
            <PlaybackControls />
          </div>
          <div className={styles.playlistDuration}>
            <TextField align="right">{durationText}</TextField>
          </div>
        </div>
      </div>
      <img className={styles.buttonListOptions} src={buttonListOption} alt="List options" />
      <img className={styles.scroll} src={scroll} alt="Scroll bar" />
      <img className={styles.resizeCorner} src={resizeCorner} alt="Resize corner" />
    </div>
  );
}

export default Content;
