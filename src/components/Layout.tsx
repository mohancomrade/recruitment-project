import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/authSlice';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="app-layout">
      {isAuthenticated && (
        <nav className="navbar">
          <div className="navbar-brand">
              Users List
          </div>
          <div className="navbar-user">
            <span>Elon Musk</span>
            <div className="user-avatar">
            <Button 
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ 
                color: 'white', 
                border: 'none',
                padding: '4px 8px',
                height: 'auto'
              }}
              title="Logout"
            />
            </div>
          </div>
        </nav>
      )}

      <main className='main-content'>
        {children}
      </main>
    </div>
  );
};

export default Layout;

