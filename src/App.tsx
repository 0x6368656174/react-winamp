import React from 'react';
import styles from './App.module.css';
import { selectPlaylistVisible } from './appSlice';
import Player from './player/Player';
import { Provider, useSelector } from 'react-redux';
import Playlist from './playlist/Playlist';
import store from './store';

function Main() {
  const playlistVisible = useSelector(selectPlaylistVisible);

  return (
    <div className={styles.app}>
      <div className={styles.player}>
        <Player />
        {playlistVisible && <Playlist />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
