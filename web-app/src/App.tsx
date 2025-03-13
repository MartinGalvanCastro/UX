// App.tsx
import React from 'react';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { SignUpScreen } from './screens/SignUpScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SendEmailScreen, ConfirmationScreen, ChangePasswordScreen } from './screens/FogetPasswordScreens';
import { DemoScreen } from './screens/DemoScreen/DemoScreen';


const App: React.FC = () => {
  return (
    <Layout>
      <Routes>

        {/**No Auth Screens */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/forgotPassword/sendEmail" element={<SendEmailScreen />} />
        <Route path="/forgotPassword/confirmation" element={<ConfirmationScreen />} />
        <Route path="/forgotPassword/changePassword" element={<ChangePasswordScreen />} />


        {/** Auth Screens */}
        <Route path="/demo" element={<DemoScreen />} />


        {/* Fallback */}
        <Route path="*" element={<SignUpScreen />} />
      </Routes>
    </Layout>
  )
};

export default App;
