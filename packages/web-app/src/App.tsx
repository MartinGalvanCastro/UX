// App.tsx
import React from 'react';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { SignUpScreen } from './screens/SignUpScreen';



const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/signup" element={<SignUpScreen />} />


        {/* Fallback */}
        <Route path="*" element={<SignUpScreen />} />
      </Routes>
    </Layout>
  )
};

export default App;
