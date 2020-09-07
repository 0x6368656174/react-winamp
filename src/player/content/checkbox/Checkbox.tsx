import React, { useState } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  label: 'eq' | 'pl' | 'shuffle' | 'repeat';
  value?: boolean;
  onChange?: (event: React.SyntheticEvent) => void;
}

function Checkbox(props: CheckboxProps) {
  const [value, setValue] = useState(props.value ?? false);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    setValue(input.checked ?? false);

    props.onChange && props.onChange(event);
  };

  return (
    <input
      className={styles[props.label]}
      type="checkbox"
      title={props.label}
      checked={value}
      onChange={handleChange}
    />
  );
}

export default Checkbox;
