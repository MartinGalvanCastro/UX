// AppNavigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignupScreen/SignupScreen";
import { AppRoutes, AppStackParamList } from "./AppRoutes";
import { ForgotPasswordSendEmailScreen, ForgotPasswordConfirmationScreen, ForgotPasswordChangeScreen } from "../screens/ForgotPasswordScreens";
import { DemoScreen } from "../screens/DemoScreen";
import { OnboardingScreen } from "../screens/OnboardingScreens";
import { AlarmFormScreen } from "../screens/AlarmFormScreen";
import { AlarmScreen } from "../screens/AlarmsScreen";

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigation = () => {
    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={AppRoutes.Login}
                screenOptions={{ headerShown: false }}
            >

                <Stack.Screen name={AppRoutes.Demo} component={DemoScreen} />

                {/** Vistas Martin */}
                <Stack.Screen name={AppRoutes.Login} component={LoginScreen} />
                <Stack.Screen name={AppRoutes.SignUp} component={SignUpScreen} />
                <Stack.Screen name={AppRoutes.ForgotPasswordSendEmail} component={ForgotPasswordSendEmailScreen} />
                <Stack.Screen name={AppRoutes.ForgotPasswordConfirmation} component={ForgotPasswordConfirmationScreen} />
                <Stack.Screen name={AppRoutes.ForgotPasswordChange} component={ForgotPasswordChangeScreen} />
                <Stack.Screen name={AppRoutes.Onboarding} component={OnboardingScreen} />


                {/** Vistas Diego */}
                <Stack.Screen name={AppRoutes.AlarmList} component={AlarmScreen} />
                <Stack.Screen name={AppRoutes.AlarmForm} component={AlarmFormScreen} />

                {/** Vistas Diego 
                <Stack.Screen name={AppRoutes.CreateAlarm} component={AlarmFormScreen} />
                <Stack.Screen name={AppRoutes.EditAlarm} component={AlarmFormScreen} />
                <Stack.Screen name={AppRoutes.MyAccount} component={MyAccountScreen} />
                <Stack.Screen name={AppRoutes.AlarmPreferences} component={AlarmPreferencesScreen} />
                <Stack.Screen name={AppRoutes.EmergencyContact} component={EmergencyContactsScreen} />
                */}
            </Stack.Navigator>
        </NavigationContainer>

    );
};
