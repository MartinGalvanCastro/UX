import { Controller, useFormContext } from 'react-hook-form';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Text } from '../Text';

export interface NumericFieldProps extends Omit<MuiTextFieldProps, 'name'> {
    name: string;
    label: string;
    endText?: string
    minValue?: number,
    maxValue?: number
    step?: number
}

export function NumericField({ name, label, endText, minValue, maxValue, step = 1, ...rest }: NumericFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <MuiTextField
                    {...field}
                    type="number"
                    label={<Text variant="ts">{label}</Text>}
                    min={0}
                    error={!!error}
                    helperText={error ? error.message : ''}
                    fullWidth
                    slotProps={{
                        input: {
                            endAdornment: (
                                endText && <InputAdornment>
                                    <Text variant="ts">{endText}</Text>
                                </InputAdornment>
                            ),
                        },
                        htmlInput: {
                            step,
                            min: minValue,
                            max: maxValue
                        }
                    }}
                    {...rest}
                />
            )}
        />
    );
}
