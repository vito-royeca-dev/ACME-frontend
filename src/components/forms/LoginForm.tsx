// LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

import InputField from '../formFields/login/inputField';
import ErrorMessage from '../formFields/login/ErrorMessage';
import SubmitButton from '../formFields/login/SubmitButton';
import { LoginFormInputs } from '../../types/types';

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Admin Login</h1>
      <InputField
        type="text"
        id="username"
        label="Username"
        error={errors.username ? errors.username.message : ''}
        register={register('username', { required: 'Username is required' })}
      />
      <InputField
        type="password"
        id="password"
        label="Password"
        error={errors.password ? errors.password.message : ''}
        register={register('password', { required: 'Password is required' })}
      />
      {error && <ErrorMessage error={error} />}
      <SubmitButton text="Sign In" />
    </form>
  );
};

export default LoginForm;
