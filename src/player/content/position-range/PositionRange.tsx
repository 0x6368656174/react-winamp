import React, { useEffect, useState } from 'react';
import styles from './PositionRange.module.css';

interface PositionRangeProps {
  value?: number;
  duration?: number;
  onChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}

function PositionRange(props: PositionRangeProps) {
  const [value, setValue] = useState(props.value ?? 0);

  useEffect(() => {
    setValue(props.value ?? 0);
  }, [props.value]);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const value = Number(input.value);

    setValue(value);

    props.onChange && props.onChange(event);
  };

  return (
    <>
      <input
        {...props}
        value={value}
        max={props.duration ?? 100}
        onChange={handleChange}
        className={[styles.range].join(' ')}
        type="range"
      />
    </>
  );
}

export default PositionRange;
