import React from 'react';
import { useDispatch } from 'react-redux';
import Window from '../window/Window';
import Content from './content/Content';
import { playlistVisibleChanged } from '../appSlice';

function Playlist() {
  const dispatch = useDispatch();

  return (
    <div>
      <Window title="WINAMP PLAYLIST" onCloseClick={() => dispatch(playlistVisibleChanged(false))}>
        <Content />
      </Window>
    </div>
  );
}

export default Playlist;
