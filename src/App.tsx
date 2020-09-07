import React, { useState } from 'react';
import styles from './App.module.css';
import { selectPlaylistVisible } from './appSlice';
import Player from './player/Player';
import { Provider, useSelector } from 'react-redux';
import Playlist from './playlist/Playlist';
import store from './store';

function Main() {
  const playlistVisible = useSelector(selectPlaylistVisible);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [originalMousePosition, setOriginalMousePosition] = useState({ x: 0, y: 0 });
  const [dragged, setDragged] = useState(false);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragged) {
      return;
    }
    event.preventDefault();

    const mouseEvent = event.nativeEvent;
    if (!(mouseEvent instanceof MouseEvent)) {
      throw new Error('Is not mouse event');
    }

    const moveX = mouseEvent.x - originalMousePosition.x;
    const moveY = mouseEvent.y - originalMousePosition.y;

    setX(originalPosition.x + moveX);
    setY(originalPosition.y + moveY);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (!dragged) {
      return;
    }
    event.preventDefault();

    setDragged(false);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    const mouseEvent = event.nativeEvent;
    if (!(mouseEvent instanceof MouseEvent)) {
      throw new Error('Is not mouse event');
    }

    setOriginalPosition({ x, y });
    setDragged(true);
    setOriginalMousePosition({ x: mouseEvent.x, y: mouseEvent.y });
  };

  return (
    <div className={styles.app} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div
        className={styles.player}
        style={{ left: `calc(100vw / 2 - 548px / 2 + ${x}px)`, top: `calc(100px + ${y}px)` }}
      >
        <Player />
        <div className={styles.dragArea} onMouseDown={handleMouseDown} />
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
