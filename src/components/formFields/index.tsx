import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SketchPicker } from 'react-color';

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  requiredMessage: string;
  min?: number;
  max?: number;
}

const generateErrorMessage = (min?: number, max?: number): string => {
  if (min !== undefined && max !== undefined) {
    return `Value should be between ${min} and ${max}.`;
  } else if (min !== undefined) {
    return `Minimum value should be ${min}.`;
  } else if (max !== undefined) {
    return `Maximum value should be ${max}.`;
  } else {
    return "";
  }
};

export const FormField: React.FC<FormFieldProps> = ({ id, label, type, register, errors, requiredMessage, min, max }) => {
  const errorMessage = generateErrorMessage(min, max);
  
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={id}
        {...register(id, { required: requiredMessage, min, max })}
        className={`mt-1 p-2 w-full border border-gray-300 rounded ${errors[id] ? 'border-red-500' : ''}`}
        {...(min !== undefined && { min })}
        {...(max !== undefined && { max })}
      />
      {errors[id] && <p className="text-red-500 text-xs italic">{errors[id].type === "min" || errors[id].type === "max" ? errorMessage : getErrorMessage(errors[id])}</p>}
    </div>
  );
};

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  requiredMessage: string;
}

export const ColorPickerField: React.FC<ColorPickerProps> = ({ color, setColor, register, errors, requiredMessage }) => (
  <div className="mb-4">
    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
    <SketchPicker
      color={color}
      onChangeComplete={(newColor) => setColor(newColor.hex)}
      className="mt-1"
    />
    <input
      type="hidden"
      id="color"
      value={color}
      {...register('color', { required: requiredMessage })}
    />
    {errors.color && <p className="text-red-500 text-xs italic">{getErrorMessage(errors.color)}</p>}
  </div>
);

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ id, label, checked, onChange }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mr-2"
    />
    <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
  </div>
);

const getErrorMessage = (error: any): string | undefined => {
  if (error) {
    if (typeof error.message === 'string') {
      return error.message;
    }
    if (error.message && typeof error.message.message === 'string') {
      return error.message.message;
    }
  }
  return undefined;
};