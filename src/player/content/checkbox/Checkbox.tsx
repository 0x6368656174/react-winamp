import React, { useEffect, useState } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  label: 'eq' | 'pl' | 'shuffle' | 'repeat';
  value?: boolean;
  onChange?: (checked: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
  const [value, setValue] = useState(props.value ?? false);

  useEffect(() => {
    setValue(props.value ?? false);
  }, [props.value, setValue]);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    setValue(input.checked ?? false);

    props.onChange && props.onChange(input.checked);
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
