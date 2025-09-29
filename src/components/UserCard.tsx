import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://via.placeholder.com/150?text=${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
  };

  return (
    <div className="user-card">
      <img
        className="user-avatar-card"
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        onError={handleImageError}
      />
      <h3 className="user-card-name">
        {user.first_name} {user.last_name}
      </h3>
      <p className="user-card-email">{user.email}</p>
      
      <div className="user-card-actions">
        <button
          onClick={() => onEdit(user)}
          className="card-action-btn card-edit-btn"
          title="Edit User"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="card-action-btn card-delete-btn"
          title="Delete User"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
