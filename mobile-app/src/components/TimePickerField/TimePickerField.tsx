// TimePickerField.tsx
import React, { useState } from 'react';
import { Platform, Modal, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '../TextField';

export interface TimePickerFieldProps {
    name: string;
    label: string;
}

export function TimePickerField({ name, label }: TimePickerFieldProps) {
    const { control } = useFormContext();
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onPress = () => {
        setShowPicker(true);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <>
                    <TextField
                        value={value}
                        label={label}
                        editable={false}
                        name={''}
                        onPress={onPress}
                    />
                    {Platform.OS === 'android' && showPicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="time"
                            is24Hour
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    setSelectedDate(date);
                                    const hours = date.getHours().toString().padStart(2, '0');
                                    const minutes = date.getMinutes().toString().padStart(2, '0');
                                    onChange(`${hours}:${minutes}`);
                                }
                                setShowPicker(false);
                            }}
                        />
                    )}
                    {Platform.OS === 'ios' && (
                        <Modal visible={showPicker} transparent animationType="fade">
                            <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
                                <Pressable style={styles.pickerContainer} onPress={() => { }}>
                                    <DateTimePicker
                                        value={selectedDate}
                                        mode="time"
                                        is24Hour
                                        display="spinner"
                                        textColor='black'
                                        onChange={(event, date) => {
                                            if (date) {
                                                setSelectedDate(date);
                                                const hours = date.getHours().toString().padStart(2, '0');
                                                const minutes = date.getMinutes().toString().padStart(2, '0');
                                                onChange(`${hours}:${minutes}`);
                                            }
                                            setShowPicker(false);
                                        }}
                                    />
                                </Pressable>
                            </Pressable>
                        </Modal>
                    )}
                </>
            )}
        />
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        elevation: 10,
    },
});
