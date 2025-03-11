import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux'; // adjust path if needed
import { TextField } from '../TextField';
import { Switch } from '../Switch'; // your custom Switch
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

// Example Redux action if you need to store the alarm data
// import { addAlarm } from '../../redux';

interface AddAlarmFormValues {
  nombreMedicamento: string;
  cadencia: string;
  horaPrimeraDosis: string;
  dosificacion: string;
  vitalicio: boolean;
  numeroDosis: number;
}

// Minimal Yup schema
const schema = Yup.object().shape({
  nombreMedicamento: Yup.string().required('Nombre del medicamento es requerido'),
  cadencia: Yup.string().required('Cadencia es requerida'),
  horaPrimeraDosis: Yup.string().required('Hora primera dosis es requerida'),
  dosificacion: Yup.string().required('Dosificación es requerida'),
  vitalicio: Yup.boolean(),
  // numeroDosis is only required if vitalicio is false
  numeroDosis: Yup.number()
    .typeError('Número de dosis debe ser un número')
    .when('vitalicio', {
      is: false,
      then: Yup.number().required('Número de dosis es requerido').min(1, 'Debe ser al menos 1'),
    }),
});

export const AddAlarmForm: React.FC = () => {
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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<AddAlarmFormValues> = (data) => {
    setLoading(true);

    // Simulate an async operation
    setTimeout(() => {
      // For example, dispatch to store the alarm data
      // dispatch(addAlarm(data));
      console.log('Alarm data submitted:', data);

      setLoading(false);
      // Navigate somewhere after success (e.g., /history)
      navigate('/history');
    }, 1500);
  };

  const { watch, formState } = methods;
  const isVitalicio = watch('vitalicio'); // watch the switch

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          // The user can wrap this in a Box or any container if desired
        }}
      >
        <TextField name="nombreMedicamento" label="Nombre Medicamento" />
        <TextField name="cadencia" label="Cadencia" />
        <TextField name="horaPrimeraDosis" label="Hora Primera Dosis" />
        <TextField name="dosificacion" label="Dosificación" />

        {/* Switch for vitalicio */}
        <Switch
          label="¿Es vitalicio?"
          checked={isVitalicio}
          onToggle={(checked) => methods.setValue('vitalicio', checked)}
          name="vitalicio"
        />

        {/* numeroDosis is only shown if vitalicio is false */}
        {!isVitalicio && (
          <TextField name="numeroDosis" label="Número de Dosis" type="number" />
        )}

        {/* Submit Button */}
        <Button
          variant="filled"
          isLoading={loading}
          onAction={methods.handleSubmit(onSubmit)}
          disabled={!formState.isValid || loading}
        >
          GUARDAR
        </Button>
      </form>
    </FormProvider>
  );
};
