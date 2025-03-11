import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField } from '../TextField';
import { Switch } from '../Switch';
import { Button } from '../Button';
import { Toast } from '../Toast';
import { NumericField } from '../NumericField';
import { TimeField } from '../TimeField';

interface AddAlarmFormValues {
    nombreMedicamento: string;
    cadencia: string;
    horaPrimeraDosis: string;
    dosificacion: string;
    vitalicio: boolean;
    numeroDosis?: number;
}

// Minimal Yup schema
const schema = Yup.object().shape({
    nombreMedicamento: Yup.string().required('Nombre del medicamento es requerido'),
    cadencia: Yup.string().required('Cadencia es requerida'),
    horaPrimeraDosis: Yup.string().required('Hora primera dosis es requerida'),
    dosificacion: Yup.string().required('Dosificación es requerida'),
    vitalicio: Yup.boolean().defined(),
    numeroDosis: Yup.number()
        .typeError('Número de dosis debe ser un número')
        .when('vitalicio', {
            is: (val: boolean) => val === false,
            then: (schema) =>
                schema.required('Número de dosis es requerido').min(1, 'Debe ser al menos 1'),
            otherwise: (schema) => schema.notRequired(),
        }),
});

export function AddAlarmForm() {
    const methods = useForm<AddAlarmFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            nombreMedicamento: '',
            cadencia: '',
            horaPrimeraDosis: '',
            dosificacion: '',
            vitalicio: false,
            numeroDosis: 0,
        },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);

    const onSubmit: SubmitHandler<AddAlarmFormValues> = (data) => {
        setLoading(true);
        // Simulate an async operation
        setTimeout(() => {
            console.log('Alarm data submitted:', data);
            setLoading(false);
            // Show success toast for 2 seconds
            setToastOpen(true);
        }, 1500);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const { watch, formState } = methods;
    const isVitalicio = watch('vitalicio');

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'start' }}
            >
                <TextField
                    name="nombreMedicamento"
                    label="Nombre Medicamento"
                    placeholder="Nombre de la presentación"
                />
                <NumericField
                    name="cadencia"
                    label="Cadencia"
                    placeholder="¿Cada cuánto se toma?"
                    endText='Horas'
                    minValue={1}
                />
                <TimeField
                    name="horaPrimeraDosis"
                    label="Hora Primera Dosis"
                />
                <NumericField
                    name="dosificacion"
                    label="Dosificación"
                    placeholder="Cantidad a tomar (mg, mL, pastillas)"
                    minValue={1}
                />

                <Switch
                    name="vitalicio"
                    label="¿Es vitalicio?"
                    checked={isVitalicio}
                    onToggle={(checked) => methods.setValue('vitalicio', checked)}
                />

                {!isVitalicio && (
                    <NumericField
                        name="numeroDosis"
                        label="Número de Dosis"
                        placeholder="¿Cuántas debes tomar?"
                    />
                )}

                <div
                    style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
                >
                    <Button
                        variant="filled"
                        isLoading={loading}
                        onAction={methods.handleSubmit(onSubmit)}
                        disabled={!formState.isValid || loading}
                        sx={{ marginTop: '50px' }}
                    >
                        GUARDAR
                    </Button>
                </div>
            </form>

            <Toast
                open={toastOpen}
                message="Alarma Creada con éxito"
                autoHideDuration={2000}
                onClose={handleToastClose}
            />
        </FormProvider>
    );
}
