import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import Login from '../src/pages/login/Login';
import Dashboard from './pages/Dashbord/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import TenantManagement from './pages/Tenant/tenant';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Route */}
        <Route path="/" index element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Layout Route with Sidebar + Outlet */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> {/* Loads at /dashboard */}
          <Route path="users" element={<UserManagement />} /> {/* Loads at /dashboard/users */}
          <Route path="/dashboard/tenants" element={<TenantManagement />} />

        </Route>

        {/* ✅ Other route (optional) */}
        {/* <Route path="/addUser" element={<UserList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
