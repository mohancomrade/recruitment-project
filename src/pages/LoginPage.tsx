import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Checkbox, Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser, clearError } from '../store/authSlice';

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/users';

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    defaultValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
      remember: false
    }
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    // Client-side validation for wrong credentials
    if (data.email !== 'eve.holt@reqres.in' || data.password !== 'cityslicka') {
      message.error('Invalid email or password');

      if (data.email !== 'eve.holt@reqres.in') {
        setError('email', {
          type: 'manual',
          message: 'Invalid email address'
        });
      }

      if (data.password !== 'cityslicka') {
        setError('password', {
          type: 'manual',
          message: 'Invalid password'
        });
      }

      return;
    }

    try {
      clearErrors();
      const result = await dispatch(loginUser({ email: data.email, password: data.password }));

      if (loginUser.rejected.match(result)) {
        const errorMessage = result.payload as string;

        message.error(errorMessage || 'Login failed');

        if (errorMessage.toLowerCase().includes('user not found') ||
          errorMessage.toLowerCase().includes('invalid email')) {
          setError('email', {
            type: 'manual',
            message: 'Invalid email address'
          });
        } else if (errorMessage.toLowerCase().includes('missing password') ||
          errorMessage.toLowerCase().includes('invalid password') ||
          errorMessage.toLowerCase().includes('wrong password')) {
          setError('password', {
            type: 'manual',
            message: 'Invalid password'
          });
        } else {
          // Generic error for both fields
          setError('email', { type: 'manual', message: 'Invalid credentials' });
          setError('password', { type: 'manual', message: 'Invalid credentials' });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      message.error('An unexpected error occurred');
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign in to your account</h2>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="login-form"
        >
          <Form.Item
            label=""
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
            className="form-item"
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email address'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder="eve.holt@reqres.in"
                  size="large"
                  type="email"
                  autoComplete="email"
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label=""
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
            className="form-item"
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="••••••••"
                  size="large"
                  autoComplete="current-password"
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
          </Form.Item>

          <Form.Item className="form-item">
            <Controller
              name="remember"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Remember me
                </Checkbox>
              )}
            />
          </Form.Item>

          <Form.Item className="form-item">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              className="login-btn"
            >
              {loading ? 'Signing in...' : 'Log in'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
