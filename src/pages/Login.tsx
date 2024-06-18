// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../components/forms/LoginForm';
import AuthLayout from '../components/layouts/AuthLayout';
import { login } from '../lib/apis';
import { LoginFormInputs } from '../types';

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data);
      localStorage.setItem('token', response.data.accessToken);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <LoginForm onSubmit={handleSubmit} error={error} />
      </motion.div>
    </AuthLayout>
  );
};

export default Login;
