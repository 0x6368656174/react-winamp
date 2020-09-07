import React from 'react';
import styles from './Header.module.css';
import icon from './icon.png';
import winampLogo from './logo.png';
import playlistLogo from './playlist-logo.png';

export interface HeaderProps {
  title?: 'WINAMP' | 'WINAMP PLAYLIST';
  onCloseClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

function Header(props: HeaderProps) {
  const isWinampHeader = props.title === 'WINAMP' || props.title === undefined;
  const isPlaylistHeader = props.title === 'WINAMP PLAYLIST';
  let logo = winampLogo;
  let logoStyle = styles.logo;
  if (isPlaylistHeader) {
    logo = playlistLogo;
    logoStyle = styles.logoPlaylist;
  }

  return (
    <header className={[styles.header, isWinampHeader ? styles.headerWinamp : ''].join(' ')}>
      {isWinampHeader && <img className={styles.icon} src={icon} alt={'Winamp icon'} />}
      <h1 className={[styles.title, isPlaylistHeader ? styles.titlePlaylist : ''].join(' ')}>
        <img className={logoStyle} src={logo} alt={'WINAMP'} />
      </h1>
      <div>
        {isWinampHeader && (
          <button className={[styles.button, styles.buttonMin].join(' ')}>Minimize</button>
        )}
        <button className={[styles.button, styles.buttonMax].join(' ')}>Maximize</button>
        <button
          className={[styles.button, styles.buttonClose].join(' ')}
          onClick={props.onCloseClick}
        >
          Close
        </button>
      </div>
    </header>
  );
}

export default Header;
