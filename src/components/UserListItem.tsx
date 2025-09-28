import React from 'react';
import { User } from '../types';

interface UserListItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
        <div className="user-info">
          <img
            className="user-avatar-table"
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <span className="user-email">{user.email}</span>
        </div>
      </td>
      <td>
        <div className="user-name">{user.first_name}</div>
      </td>
      <td>
        <div className="user-name">{user.last_name}</div>
      </td>
      <td>
        <div className="action-buttons">
          <button
            onClick={() => onEdit(user)}
            className="btn-edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserListItem;
