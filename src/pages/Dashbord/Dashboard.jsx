import React from 'react';
import './dashboard.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

  // const Navigate = useNavigate();

  const Navigate = useNavigate();
  return (
    <div className="dashboard-page">
      {/* <Sidebar /> */}
      <main className="dashboard-main">
        <header className="top-nav">
          <div>
            <span className="user-role">System Administrator</span>
            <span className="user-name">Super Admin</span>
          </div>

          <button className="logout-btn" onClick={() => { Navigate('/login') }}>Logout</button>
        </header>

        <div className="welcome-banner">
          <h2>Welcome back, System Administrator!</h2>
          <p>Monitor your entire CMMS platform across all tenants</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h4>Active Tenants</h4>
            <p>24</p>
            <span className="change up">+12%</span>
          </div>
          <div className="stat-card">
            <h4>Total Users</h4>
            <p>1,247</p>
            <span className="change up">+8%</span>
          </div>
          <div className="stat-card">
            <h4>System Uptime</h4>
            <p>99.9%</p>
            <span className="change stable">Stable</span>
          </div>
          <div className="stat-card">
            <h4>Support Tickets</h4>
            <p>7</p>
            <span className="change down">-23%</span>
          </div>
        </div>

        <div className="activity-feed">
          <h3>Recent Activity</h3>
          <p className="subtext">Latest updates from your operations</p>
          <ul>
            <li><span className="dot green" /> Work Order #WO-2024-156 completed by John Smith — 5 min ago</li>
            <li><span className="dot orange" /> Compressor Unit 3 temperature alert resolved — 12 min ago</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
