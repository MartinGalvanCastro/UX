// TextField.tsx
import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { Text } from '../Text';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'name'> {
  name: string;
  label: string;
}

export const TextField: React.FC<TextFieldProps> = ({ name, label, ...rest }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          label={
            <Text variant='ts'>{label}</Text>
          }
          error={!!error}
          helperText={error ? error.message : ''}
          fullWidth
          {...rest}
        />
      )}
    />
  );
};

