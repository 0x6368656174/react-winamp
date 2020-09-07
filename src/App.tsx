import React from 'react';
import styles from './App.module.css';
import Player from './player/Player';
import { Provider } from 'react-redux';
import Playlist from './playlist/Playlist';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <div className={styles.player}>
          <Player />
          <Playlist />
        </div>
      </div>
    </Provider>
  );
}

export default App;
