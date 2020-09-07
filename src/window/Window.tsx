import React from 'react';
import Header, { HeaderProps } from '../header/Header';
import styles from './Window.module.css';

interface WindowProps {
  title?: HeaderProps['title'];
  children?: any;
  onCloseClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

function Window(props: WindowProps) {
  return (
    <div className={styles.window}>
      <Header title={props.title} onCloseClick={props.onCloseClick} />
      <main className={styles.content}>{props.children}</main>
    </div>
  );
}

export default Window;
