import React from 'react';
import Header, { HeaderProps } from '../header/Header';
import styles from './Window.module.css';

interface WindowProps {
  title?: HeaderProps['title'];
  children: any;
}

function Window(props: WindowProps) {
  return (
    <div className={styles.window}>
      <Header title={props.title} />
      <main className={styles.content}>{props.children}</main>
    </div>
  );
}

export default Window;
