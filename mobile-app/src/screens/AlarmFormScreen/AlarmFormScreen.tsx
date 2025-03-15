import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { AppRoutes, AppStackParamList } from '../../navigation';
import { RootState, addAlarm, updateAlarm } from '../../redux';
import { Text, Switch, TextInput as RNTextField, IconButton } from 'react-native-paper';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import { Screen } from '../../components/Screen';
import { TimePickerField } from '../../components/TimePickerField';

export type AlarmFormScreenProps = NativeStackScreenProps<AppStackParamList, AppRoutes.AlarmForm>;

type FormValues = {
    name: string;
    cadence: number;
    firstDoseHour: string;
    dose: string;
    isForver: boolean;
    quantityLef?: number;
};

const schema = Yup.object().shape({
    name: Yup.string().required('Nombre es requerido'),
    cadence: Yup.number().positive().required('Cadencia es requerida'),
    firstDoseHour: Yup.string().required('Hora primera dosis es requerida'),
    dose: Yup.string().required('Dosificación es requerida'),
    isForver: Yup.boolean().required(),
    quantityLef: Yup.number().when('isForver', {
        is: (isForver: boolean) => !isForver,
        then: (schema) => schema.min(1).required('Número de dosis es requerido'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

export function AlarmFormScreen({ route, navigation }: AlarmFormScreenProps) {
    const dispatch = useDispatch();
    const { alarms } = useSelector((state: RootState) => state.alarm);
    const alarmId = route.params.alarmId ?? null;
    const existingAlarm = alarms.find((a) => a.id === alarmId) || null;
    const isEdit = existingAlarm !== null;
    const [loading, setLoading] = useState<boolean>(false);

    const defaultValues: FormValues = {
        name: existingAlarm?.name || '',
        cadence: existingAlarm?.cadence || 0,
        firstDoseHour: existingAlarm?.firstDoseHour || '',
        dose: existingAlarm?.dose || '',
        isForver: existingAlarm?.isForver ?? false,
        quantityLef: existingAlarm?.quantityLef || 0,
    };

    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues,
        mode: 'onChange',
    });

    const { handleSubmit, formState: { isValid } } = methods;

    const onSubmit = (data: FormValues) => {

        setLoading(true)

        setTimeout(() => {
            const action = isEdit ? updateAlarm : addAlarm;
            const payload = isEdit ? { ...existingAlarm, ...data } : data;
            dispatch(action(payload));
            setLoading(false);
            navigation.goBack();
        }, 1000);

    };

    return (
        <Screen>
            <FormProvider {...methods}>
                <View style={styles.container}>
                    <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
                    <Text variant="headlineLarge" style={styles.title}>
                        {isEdit ? 'Editar Alarma' : 'Crear Alarma'}
                    </Text>
                    <View style={styles.formItem}>
                        <TextField name="name" label="Nombre Medicamento" />
                    </View>
                    <View style={styles.formItem}>
                        <TextField
                            name="cadence"
                            label="Cadencia"
                            keyboardType="numeric"
                            right={<RNTextField.Affix text="Horas" />}
                        />
                    </View>
                    <View style={styles.formItem}>
                        <TimePickerField name="firstDoseHour" label="Hora Primera Dosis" />
                    </View>
                    <View style={styles.formItem}>
                        <TextField name="dose" label="Dosificación" />
                    </View>
                    <View style={[styles.formItem, styles.switchRow]}>
                        <Text variant="bodyMedium" style={styles.switchLabel}>
                            ¿Es vitalicio?
                        </Text>
                        <Controller
                            control={methods.control}
                            name="isForver"
                            render={({ field: { value, onChange } }) => (
                                <Switch value={value} onValueChange={onChange} />
                            )}
                        />
                    </View>
                    {methods.watch('isForver') === false && (
                        <View style={styles.formItem}>
                            <TextField name="quantityLef" label="Número de Dosis" keyboardType="numeric" />
                        </View>
                    )}
                    <View style={styles.saveButtonContainer}>
                        <Button
                            mode="contained"
                            onAction={handleSubmit(onSubmit)}
                            disabled={!isValid || loading}
                            style={styles.saveButton}
                        >
                            GUARDAR
                        </Button>
                    </View>
                </View>
            </FormProvider>
        </Screen>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'stretch',
    },
    title: {
        marginBottom: 32,
        textAlign: 'center',
    },
    formItem: {
        marginBottom: 16,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switchLabel: {
        marginRight: 8,
    },
    saveButtonContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    saveButton: {
        alignSelf: 'stretch',
    },
    timePickerButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 4,
    },
});