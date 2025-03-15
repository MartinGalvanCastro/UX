// App.tsx
import React from 'react';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { SignUpScreen } from './screens/SignUpScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SendEmailScreen, ConfirmationScreen, ChangePasswordScreen } from './screens/FogetPasswordScreens';
import { HistoryScreen } from './screens/HistoryScreen';
import { AdminScreen } from './screens/AdminScreen';
import { ReportScreen } from './screens/ReportScreen/ReportScreen';
import { AddAlarmScreen } from './screens/AddAlarmScreen/AddAlarmScreen';
import { ProfileScreen } from './screens/AdminScreen/ProfileScreen';
import { AlarmPreferncesScreen } from './screens/AlarmPreferencesScreen';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>

        {/**Vistas Martin */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/forgotPassword/sendEmail" element={<SendEmailScreen />} />
        <Route path="/forgotPassword/confirmation" element={<ConfirmationScreen />} />
        <Route path="/forgotPassword/changePassword" element={<ChangePasswordScreen />} />


        {/**Vistas Diego */}
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/reports" element={<ReportScreen />} />
        <Route path="/addAlarm" element={<AddAlarmScreen />} />

        {/** Auth Screens */}
        <Route path="/profileAdmin" element={<AdminScreen />} />
        <Route path="/profileAdmin/alarmPreferences" element={<ProfileScreen />} />
        <Route path="/profileAdmin/editProfile" element={<AdminScreen />} />


        {/* Fallback */}
        <Route path="*" element={<SignUpScreen />} />
      </Routes>
    </Layout>
  )
};

export default App;
