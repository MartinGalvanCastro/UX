import { AlarmFromScreenParams } from "../screens/AlarmFormScreen/AlarmFormScreenParams";
import { OnboardingScreenParam } from "../screens/OnboardingScreens";

export enum AppRoutes{
    Login = 'LoginScreen',
    SignUp = 'SignUpScreen',
    ForgotPasswordSendEmail = 'ForgotPasswordSendEmail',
    ForgotPasswordConfirmation = 'ForgotPasswordConfirmation',
    ForgotPasswordChange = 'ForgotPasswordChange',
    Onboarding = 'Onboarding',
    AlarmForm = 'AlarmFormScreen',
    AlarmList = 'AlarmListScreen',
    MyAccount = 'MyAccountScreen',
    AlarmPreferences = 'AlarmPreferencesScreen',
    EmergencyContact = 'EmergencyContactsScreen',
}

export type AppStackParamList = {
    [AppRoutes.Login]: undefined;
    [AppRoutes.SignUp]: undefined;
    [AppRoutes.ForgotPasswordSendEmail]: undefined;
    [AppRoutes.ForgotPasswordConfirmation]: undefined;
    [AppRoutes.ForgotPasswordChange]: undefined;
    [AppRoutes.AlarmList]: undefined;
    [AppRoutes.Onboarding]: OnboardingScreenParam;
    [AppRoutes.AlarmForm]: AlarmFromScreenParams;
    [AppRoutes.MyAccount]: undefined;
    [AppRoutes.AlarmPreferences]: undefined;
    [AppRoutes.EmergencyContact]: undefined;
}