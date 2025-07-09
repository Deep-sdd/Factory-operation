import React from 'react';
import './sidebar.scss';
import { FaUsers, FaClipboardList, FaChartBar, FaCogs, FaBell, FaTools, FaBuilding, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">FactoryOps</h2>
      <p className="tagline">CMMS Platform</p>
      <ul className="nav-list">
        <li className="active" onClick={() => navigate('/dashboard')}>
          <FaChartBar /> Dashboard
        </li>
        <li onClick={() => navigate('/dashboard/tenants')}>
          <FaBuilding /> Tenants
        </li>
        <li onClick={() => navigate('/dashboard/users')}>
          <FaUsers /> Users
        </li>
        {/* <li><FaClipboardList /> Work Orders</li>
        <li><FaTools /> Assets</li>
        <li><FaCogs /> Maintenance</li>
        <li><FaChartBar /> Reports</li>
        <li><FaBell /> Alerts</li>
        <li><FaUserShield /> Settings</li> */}
      </ul>
    </div>
  );
};

export default Sidebar;