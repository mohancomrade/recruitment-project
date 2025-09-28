import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route path="*" element={<Navigate to="/users" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
