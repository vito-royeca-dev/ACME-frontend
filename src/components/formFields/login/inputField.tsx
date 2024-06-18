// InputField.tsx
import React from 'react';

interface InputFieldProps {
  type: string;
  id: string;
  label: string;
  error?: string;
  register: any;
}

const InputField: React.FC<InputFieldProps> = ({ type, id, label, error, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default InputField;
