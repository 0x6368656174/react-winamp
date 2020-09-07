import React, { useEffect, useRef } from 'react';
import styles from './SongName.module.css';

interface SongNameProps {
  name: string;
}

function SongName(props: SongNameProps) {
  let textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = textRef.current;
    if (!div) {
      throw new Error('Not found div with name');
    }

    let stopAnimation = false;

    const width = -1 * (div.querySelector('span')?.offsetWidth || 0);

    let lastFrameTime = performance.now();

    requestAnimationFrame(function animate(time) {
      if (stopAnimation) {
        return;
      }

      if (time - lastFrameTime > 15) {
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
    };
  }, [textRef]);

  return (
    <div className={['withBorder', styles.songName].join(' ')}>
      <div ref={textRef} className={styles.nameText}>
        <span>{props.name} *** </span>
        <span>{props.name} *** </span>
        <span>{props.name} *** </span>
      </div>
    </div>
  );
}

export default SongName;
