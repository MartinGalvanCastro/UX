import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Text } from 'react-native-paper';
import { Screen } from '../../components/Screen';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { AppRoutes, useNavigation } from '../../navigation';

interface ForgotPasswordFormValues {
  email: string;
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
});

export function ForgotPasswordSendEmailScreen() {

  const navigate = useNavigation();

  const methods = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  const onSubmit = (_data: ForgotPasswordFormValues) => {
    navigate.navigate(AppRoutes.ForgotPasswordConfirmation);
  };

  return (
    <Screen>
      <FormProvider {...methods}>
        <View style={styles.container}>
          <Text variant="displayLarge" style={styles.title}>
            Olvidé Mi Contraseña
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Ingresa el correo con el que te registraste y te enviaremos un correo para que puedas restablecer tu contraseña.
          </Text>
          <View style={styles.inputContainer}>
            <TextField name="email" label="Correo" />
          </View>
          <Button
            mode="contained"
            onAction={methods.handleSubmit(onSubmit)}
            style={styles.sendButton}
            disabled={!methods.formState.isValid}
          >
            ENVIAR
          </Button>
          <Button mode="text" onAction={navigate.goBack} style={styles.backButton}>
            VOLVER
          </Button>
        </View>
      </FormProvider>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  title: {
    marginTop: 64,
    marginBottom: 64,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  sendButton: {
    width: '100%',
    marginBottom: 64,
  },
  backButton: {
    alignSelf: 'center',
  },
});
