import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/common/Layout';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import MembersPage from './pages/MembersPage';
import BorrowPage from './pages/BorrowPage';
import GenresPage from './pages/GenresPage';
import StaffPage from './pages/StaffPage';
import ReportsPage from './pages/ReportsPage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/books" element={
            <PrivateRoute>
              <Layout>
                <BooksPage />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/members" element={
            <PrivateRoute>
              <Layout>
                <MembersPage />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/borrow" element={
            <PrivateRoute>
              <Layout>
                <BorrowPage />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/genres" element={
            <PrivateRoute>
              <Layout>
                <GenresPage />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/staff" element={
            <PrivateRoute>
              <Layout>
                <StaffPage />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <Layout>
                <ReportsPage />
              </Layout>
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;