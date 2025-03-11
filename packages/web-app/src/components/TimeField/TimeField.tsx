import { Controller, useFormContext } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { TextField as MuiTextField } from '@mui/material';


export interface TimeFieldProps {
    name: string;
    label: string;
}

export function TimeField({ name, label }: TimeFieldProps) {
    const { control } = useFormContext();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                    <TimePicker
                        label={label}
                        value={value ? new Date(value) : null}
                        onChange={(newValue) => {
                            onChange(newValue ? newValue.getTime() : null);
                        }}
                        slots={{
                            textField: MuiTextField,
                        }}
                        slotProps={{
                            textField: {
                                error: !!error,
                                helperText: error ? error.message : '',
                                fullWidth: true,
                            },
                        }}
                        {...field}
                    />
                )}
            />
        </LocalizationProvider>
    );
}
