import React, { useRef, useState } from 'react';
import styles from './Range.module.css';

interface RangeProps {
  name?: string;
  value?: number;
  max?: number;
  min?: number;
  onChange?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}

function Range(props: RangeProps) {
  const listIdRef = useRef('id_' + Math.random());
  const [value, setValue] = useState(props.value ?? 0);
  const [colorNumber, setColorNumber] = useState(
    getColorNumber(props.value ?? 0, props.min ?? 0, props.max ?? 100)
  );

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const value = Number(input.value);
    const min = Number(input.min);
    const max = Number(input.max);

    setValue(value);
    setColorNumber(getColorNumber(value, min, max));

    props.onChange && props.onChange(event);
  };

  const min = props.min ?? 0;
  const max = props.max ?? 100;

  return (
    <>
      <input
        {...props}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={[styles['range' + colorNumber], styles.range].join(' ')}
        type="range"
        list={min * max < 0 ? listIdRef.current : undefined}
      />
      {min * max < 0 && (
        <datalist id={listIdRef.current}>
          <option value={0} />
        </datalist>
      )}
    </>
  );
}

export default Range;

function getColorNumber(value: number, min: number, max: number): number {
  let percent = 0;
  if (value > 0 && max !== 0) {
    percent = value / max;
  }
  if (value < 0 && min !== 0) {
    percent = value / min;
  }

  const result = Math.ceil(30 * percent);
  return result < 30 ? result : 29;
}
