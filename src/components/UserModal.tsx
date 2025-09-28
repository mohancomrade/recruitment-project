import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: { name: string; job: string }) => void;
  user?: User | null;
  loading?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  user, 
  loading = false 
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; profileImage?: string }>({});

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setProfileImage(user.avatar);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setProfileImage('');
    }
    setErrors({});
  }, [user, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: { firstName?: string; lastName?: string; email?: string; profileImage?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!profileImage.trim()) {
      newErrors.profileImage = 'Profile image link is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    onSave({ name: fullName, job: 'Developer' });
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
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label required">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`form-input ${errors?.firstName ? 'error' : ''}`}
              placeholder="Please enter first name"
            />
            {errors?.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label required">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`form-input ${errors?.lastName ? 'error' : ''}`}
              placeholder="Please enter last name"
            />
            {errors?.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label required">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${errors?.email ? 'error' : ''}`}
              placeholder="Please enter email"
            />
            {errors?.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="profileImage" className="form-label required">
              Profile Image Link
            </label>
            <input
              type="url"
              id="profileImage"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className={`form-input ${errors?.profileImage ? 'error' : ''}`}
              placeholder="Please enter profile image link"
            />
            {errors?.profileImage && (
              <div className="error-message">{errors.profileImage}</div>
            )}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;