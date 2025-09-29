import React, { useEffect, useState, useMemo } from 'react';
import { Table, Button, Input, Space, Avatar, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  setSearchQuery,
  setViewMode,
  setCurrentPage,
  clearError,
} from '../store/usersSlice';
import { User } from '../types';
import UserCard from '../components/UserCard';
import UserModal from '../components/UserModal';

const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    users,
    loading,
    error,
    currentPage,
    searchQuery,
    viewMode,
  } = useAppSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Pagination settings for Ant Design table
  const USERS_PER_PAGE = 6;

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    return users.filter(user =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);


  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPage(1));
  };

  const handleViewModeChange = (mode: 'list' | 'card') => {
    dispatch(setViewMode(mode));
    // Clear search when changing view modes
    dispatch(setSearchQuery(''));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await dispatch(deleteUser(userId));
      message.success('User deleted successfully');
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  // Ant Design table columns
  const columns: ColumnsType<User> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '40%',
      align: 'left',
      render: (email: string, record: User) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            src={record.avatar} 
            size={32}
            style={{ backgroundColor: '#4285f4' }}
          >
            {record.first_name.charAt(0)}{record.last_name.charAt(0)}
          </Avatar>
          <a href={`mailto:${email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
            {email}
          </a>
        </div>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '20%',
      align: 'left',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '20%',
      align: 'left',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      align: 'left',
      render: (_, record: User) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            onClick={() => handleEditUser(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleModalSave = async (userData: { name: string; job: string; email?: string; avatar?: string }) => {
    try {
      if (selectedUser) {
        await dispatch(updateUser({ id: selectedUser.id, userData }));
        message.success('User updated successfully!');
      } else {
        await dispatch(createUser(userData));
        message.success('User created successfully!');
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error('Failed to save user. Please try again.');
    }
  };


  return (
    <div className="users-container">
      {/* Header with Controls */}
      <div className="page-header-with-controls">
        <div className="page-header-left">
          <h1 className="page-title">Users</h1>
          <div style={{ marginTop: 6 }}>
          <Button.Group style={{ marginRight: 16 }}>
            <Button
              type={viewMode === 'list' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('list')}
            >
              📋 Table
            </Button>
            <Button
              type={viewMode === 'card' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('card')}
            >
              📇 Card
            </Button>
          </Button.Group>
          </div>
        </div>
        <div className="page-header-right">
          <Input.Search
            placeholder="input search text"
            allowClear
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 300, marginRight: 16 }}
          />
        
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleCreateUser}
          >
            Create User
          </Button>
        </div>
      </div>

      {/* Users Display */}
      {viewMode === 'card' ? (
        filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p>
              {searchQuery ? 'No users found matching your search.' : 'No users found.'}
            </p>
          </div>
        ) : (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={(id) => handleDeleteUser(id)}
              />
            ))}
          </div>
        )
      ) : (
        <Table<User>
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: USERS_PER_PAGE,
            total: filteredUsers.length,
            onChange: handlePageChange,
          }}
          locale={{
            emptyText: searchQuery
              ? 'No users found matching your search.'
              : 'No users found.',
          }}
        />
      )}

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        user={selectedUser}
        loading={loading}
      />

    </div>
  );
};

export default UsersPage;
