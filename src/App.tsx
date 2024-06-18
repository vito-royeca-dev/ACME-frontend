// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './PrivateRoute';
import { AlertProvider } from './context/AlertContext';

const App: React.FC = () => {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<PrivateRoute Target={AdminDashboard} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
};

export default App;