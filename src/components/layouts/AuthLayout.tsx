import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
