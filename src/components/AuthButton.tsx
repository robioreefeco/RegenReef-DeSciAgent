import React from 'react';
import { LogIn, LogOut, User, Wallet, Mail } from 'lucide-react';
import { usePrivyAuth } from '../hooks/usePrivyAuth';

export const AuthButton: React.FC = () => {
  const { ready, authenticated, user, login, logout } = usePrivyAuth();

  if (!ready) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg animate-pulse">
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span>Connect</span>
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
        {user?.email ? (
          <Mail className="w-4 h-4 text-green-600" />
        ) : (
          <Wallet className="w-4 h-4 text-green-600" />
        )}
        <span className="text-sm font-medium text-green-800">
          {user?.email?.address || user?.wallet?.address?.slice(0, 6) + '...' || 'Connected'}
        </span>
      </div>
      
      <button
        onClick={logout}
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm">Disconnect</span>
      </button>
    </div>
  );
};