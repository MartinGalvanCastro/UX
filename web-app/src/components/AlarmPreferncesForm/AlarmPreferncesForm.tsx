import { useState } from 'react';
import { Box } from '../Box';
import { Switch } from '../Switch';
import { Button } from '../Button';
import { Toast } from '../Toast';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux'; // adjust path as needed
import { updateNotificationPreferences } from '../../redux'; // adjust path as needed

export interface PreferencesFormValues {
    correo: boolean;
    notificacionApp: boolean;
    sms: boolean;
}

// Yup schema for the preferences form
const schema = Yup.object().shape({
    correo: Yup.boolean().required(),
    notificacionApp: Yup.boolean().required(),
    sms: Yup.boolean().required(),
});

export function AlarmPreferencesForm() {
    // Get initial notification preferences from Redux store
    const notificationPreferences = useSelector(
        (state: RootState) => state.user.notificationPreferences
    );

    const methods = useForm<PreferencesFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            correo: notificationPreferences.email,
            notificacionApp: notificationPreferences.pushNotification,
            sms: notificationPreferences.sms,
        },
        mode: 'onChange',
    });

    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);

    const onSubmit: SubmitHandler<PreferencesFormValues> = (data) => {
        setLoading(true);
        // Simulate a short async operation
        setTimeout(() => {
            console.log('Preferences data:', data);
            // Dispatch the updated notification preferences
            dispatch(
                updateNotificationPreferences({
                    email: data.correo,
                    pushNotification: data.notificacionApp,
                    sms: data.sms,
                })
            );
            setLoading(false);
            setToastOpen(true);
        }, 1500);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const { handleSubmit, watch, setValue, formState } = methods;
    const correoVal = watch('correo');
    const appVal = watch('notificacionApp');
    const smsVal = watch('sms');

    return (
        <Box
            sx={{
                paddingRight: '20px',
                paddingLeft: '20px',
                paddingTop: '10px',
                paddingBottom: '10px',
            }}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'start', maxWidth: '300px' }}>
                    {/* Correo row */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '8px 0',
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        <span>Correo</span>
                        <Switch
                            name="correo"
                            checked={correoVal}
                            onToggle={(checked) => setValue('correo', checked)}
                        />
                    </div>

                    {/* Notificación App row */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '8px 0',
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        <span>Notificación App</span>
                        <Switch
                            name="notificacionApp"
                            checked={appVal}
                            onToggle={(checked) => setValue('notificacionApp', checked)}
                        />
                    </div>

                    {/* SMS row */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '8px 0',
                        }}
                    >
                        <span>SMS</span>
                        <Switch
                            name="sms"
                            checked={smsVal}
                            onToggle={(checked) => setValue('sms', checked)}
                        />
                    </div>

                    <Button
                        variant="filled"
                        isLoading={loading}
                        onAction={handleSubmit(onSubmit)}
                        disabled={!formState.isValid || loading}
                        sx={{ marginTop: '16px' }}
                    >
                        GUARDAR
                    </Button>
                </form>

                <Toast
                    open={toastOpen}
                    message="Preferencias actualizadas con éxito"
                    autoHideDuration={2000}
                    onClose={handleToastClose}
                />
            </FormProvider>
        </Box>
    );
}