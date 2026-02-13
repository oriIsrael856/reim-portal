import { useState, useEffect } from 'react';
import { subscribeToAuthState, login as authLogin, logout as authLogout } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = subscribeToAuthState((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      await authLogin(email, password);
    } catch (err) {
      setError(err.code);
      throw err;
    }
  };

  const logout = async () => {
    await authLogout();
  };

  const clearError = () => setError(null);

  return { user, loading, error, login, logout, clearError };
}
