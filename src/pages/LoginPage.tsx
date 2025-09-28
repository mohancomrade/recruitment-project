import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser, clearError } from '../store/authSlice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/users';

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign in to your account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${validationErrors.email ? 'error' : ''}`}
              placeholder="👤 eve.holt@reqres.in"
            />
            {validationErrors.email && (
              <div className="error-message">{validationErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-input ${validationErrors.password ? 'error' : ''}`}
              placeholder="🔒 ••••••••"
            />
            {validationErrors.password && (
              <div className="error-message">{validationErrors.password}</div>
            )}
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          {error && (
            <div className="error-message-container">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-btn-primary"
          >
            {loading ? 'Signing in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
