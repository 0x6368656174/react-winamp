import React from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  children: any;
  align?: 'left' | 'right';
  onClick?: (event: React.SyntheticEvent) => void;
}

function TextField(props: TextFieldProps) {
  return (
    <div className={['withBorder', styles.textField].join(' ')} onClick={props.onClick}>
      <span className={[styles.text, props.align === 'right' ? styles.alightRight : ''].join(' ')}>
        {props.children}
      </span>
    </div>
  );
}

export default TextField;
