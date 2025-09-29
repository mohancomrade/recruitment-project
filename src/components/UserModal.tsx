import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, PictureOutlined } from '@ant-design/icons';
import { User } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: { name: string; job: string; email?: string; avatar?: string }) => void;
  user?: User | null;
  loading?: boolean;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

const UserModal: React.FC<UserModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  user, 
  loading = false 
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      profileImage: ''
    }
  });

  // Watch profile image to show preview
  const profileImageUrl = watch('profileImage');

  useEffect(() => {
    if (user) {
      setValue('firstName', user.first_name);
      setValue('lastName', user.last_name);
      setValue('email', user.email);
      setValue('profileImage', user.avatar);
    } else {
      reset();
    }
  }, [user, isOpen, setValue, reset]);

  const onSubmit = (data: UserFormData) => {
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
    onSave({ 
      name: fullName, 
      job: 'Developer',
      email: data.email.trim(),
      avatar: data.profileImage.trim()
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {user ? 'Edit User' : 'Create New User'}
          </h3>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>
        
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="user-modal-form"
        >
          

          <Form.Item
            label="First Name"
            validateStatus={errors.firstName ? 'error' : ''}
            help={errors.firstName?.message}
            required
          >
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder="Please enter first name"
                  size="large"
                  status={errors.firstName ? 'error' : ''}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            validateStatus={errors.lastName ? 'error' : ''}
            help={errors.lastName?.message}
            required
          >
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder="Please enter last name"
                  size="large"
                  status={errors.lastName ? 'error' : ''}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
            required
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder="Please enter email"
                  size="large"
                  type="email"
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Profile Image URL"
            validateStatus={errors.profileImage ? 'error' : ''}
            help={errors.profileImage?.message}
            extra="Paste any image URL - it will show a preview above"
            required
          >
            <Controller
              name="profileImage"
              control={control}
              rules={{
                required: 'Profile image URL is required',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Please enter a valid URL starting with http:// or https://'
                },
                validate: (value) => {
                  // Allow any valid URL format
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'Please enter a valid URL';
                  }
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<PictureOutlined />}
                  placeholder="Paste any image URL here (e.g., https://via.placeholder.com/150)"
                  size="large"
                  type="url"
                  status={errors.profileImage ? 'error' : ''}
                />
              )}
            />
          </Form.Item>

          <div className="modal-actions">
            <Button
              type="default"
              onClick={onClose}
              size="large"
              className="cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="submit-btn"
            >
              {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserModal;