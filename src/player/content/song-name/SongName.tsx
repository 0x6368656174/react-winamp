import React, { useEffect, useRef } from 'react';
import styles from './SongName.module.css';

interface SongNameProps {
  name: string;
  messageText?: string;
}

function SongName(props: SongNameProps) {
  let textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.messageText) {
      return;
    }

    const div = textRef.current;
    if (!div) {
      throw new Error('Not found div with name');
    }

    let stopAnimation = false;

    let lastFrameTime = performance.now();

    requestAnimationFrame(function animate(time) {
      if (stopAnimation) {
        return;
      }

      const width = -1 * (div.querySelector('span')?.offsetWidth || 0);

      if (time - lastFrameTime > 17) {
        const current = parseInt(div.style.left) || 0;
        let next = current - 1;

        if (next < width) {
          next = 0;

          const firstSpan = div.querySelector('span');
          if (!firstSpan) {
            throw new Error('Not found span');
          }

          div.removeChild(firstSpan);
          div.append(firstSpan);
        }

        div.style.left = next + 'px';

        lastFrameTime = time;
      }

      requestAnimationFrame(animate);
    });

    return () => {
      stopAnimation = true;
      div.style.left = '5px';
    };
  }, [textRef, props.messageText, props.name]);

  return (
    <div className={['withBorder', styles.songName].join(' ')}>
      {props.messageText ? (
        <div className={styles.nameText}>{props.messageText}</div>
      ) : (
        <div ref={textRef} className={styles.nameText}>
          <span>{props.name} *** </span>
          <span>{props.name} *** </span>
          <span>{props.name} *** </span>
        </div>
      )}
    </div>
  );
}

export default SongName;
