import React from 'react';
import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControlLabel,
} from '@mui/material';

export interface SwitchProps extends Omit<MuiSwitchProps, 'onChange'> {
  /** Name of the switch (useful for forms) */
  name: string;
  /** Label to display next to the switch */
  label: string;
  /** Controlled checked state */
  checked: boolean;
  /**
   * Callback fired when the switch toggles.
   * Receives the new checked value.
   */
  onToggle: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  checked,
  onToggle,
  ...props
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newChecked: boolean
  ) => {
    onToggle(newChecked);
  };

  return (
    <FormControlLabel
      label={label}
      labelPlacement='start'
      control={
        <MuiSwitch
          {...props}
          name={name}
          checked={checked}
          onChange={handleChange}
          color="primary"
        />
      }
    />
  );
};
