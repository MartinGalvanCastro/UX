// TextField.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as PaperTextInput, TextInputProps, HelperText } from 'react-native-paper';
import { Controller, useFormContext } from 'react-hook-form';
import { Text } from 'react-native-paper';

export interface TextFieldProps extends Omit<TextInputProps, 'name'> {
    name: string;
    label: string;
}

export const TextField: React.FC<TextFieldProps> = ({ name, label, ...rest }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <>
                    <PaperTextInput
                        mode="outlined"
                        label={label}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={!!error}
                        {...rest}
                    />
                    <HelperText type="error" visible={!!error}>
                        {error?.message}
                    </HelperText>
                </>
            )}
        />
    );
};