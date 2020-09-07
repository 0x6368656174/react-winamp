import React from 'react';
import { durationString } from '../utils';
import styles from './FileList.module.css';

interface File {
  path: string;
  name: string;
  duration: number;
}

interface FileListProps {
  currentFileNumber?: number;
  files: File[];
  onSelected?: (filePath: string) => void;
}

function FileList(props: FileListProps) {
  return (
    <div className={['withBorder', styles.fileList].join(' ')}>
      <ul className={styles.files}>
        {props.files.map((file, index) => (
          <li className={styles.file} key={file.path}>
            {' '}
            <button
              className={[
                styles.fileButton,
                props.currentFileNumber === index ? styles.currentFile : '',
              ].join(' ')}
              onDoubleClick={() => props.onSelected && props.onSelected(file.path)}
            >
              <span className={styles.fileNumber}>{index + 1}.</span>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileDuration}>{durationString(file.duration)}</span>
            </button>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
