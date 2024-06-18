// ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return <p className="text-red-500 text-xs italic">{error}</p>;
};

export default ErrorMessage;
