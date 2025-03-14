import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/Button/Button';
import { AppRoutes, useNavigation } from '../../navigation';

export function ForgotPasswordConfirmationScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(AppRoutes.ForgotPasswordChange);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="displayLarge" style={styles.title}>
          Olvide Mi Contraseña
        </Text>
        <View>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Te hemos enviado un correo electrónico a la dirección que nos indicaste.
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Revisa tu bandeja de entrada o spam para restablecer tu contraseña.
          </Text>
        </View>
        <Button mode="contained" onAction={handlePress}>
          VOLVER
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
