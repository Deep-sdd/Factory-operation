import React, { useState } from 'react';
import './tenant.scss';
import {
    FaBuilding,
    FaSearch,
    FaFilter,
    FaPlus,
    FaCheckCircle,
    FaTimesCircle,
    FaGlobe,
    FaPhone,
    FaEnvelope,
    FaUsers,
    FaTimes,
    FaEdit,
} from 'react-icons/fa';

const mockTenants = [
    {
        id: 1,
        name: 'Factory A',
        domain: 'factory-a',
        contactEmail: 'admin@factory-a.com',
        contactPhone: '+1 (555) 123-4567',
        status: 'Active',
        userCount: 24,
        plan: 'Enterprise',
        createdDate: '2023-01-15',
    },
    {
        id: 2,
        name: 'Factory B',
        domain: 'factory-b',
        contactEmail: 'admin@factory-b.com',
        contactPhone: '+1 (555) 987-6543',
        status: 'Inactive',
        userCount: 12,
        plan: 'Professional',
        createdDate: '2023-03-22',
    },
];

const TenantManagement = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [tenants, setTenants] = useState(mockTenants);
    const [newTenant, setNewTenant] = useState({
        id: 0,
        name: '',
        domain: '',
        contactEmail: '',
        contactPhone: '',
        status: 'Active',
        plan: 'Professional',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const plans = ['Basic', 'Professional', 'Enterprise', 'Custom'];
    const statuses = ['Active', 'Inactive', 'Suspended'];

    const validateForm = () => {
        const newErrors = {};

        if (!newTenant.name.trim()) {
            newErrors.name = 'Tenant name is required';
        }

        if (!newTenant.domain.trim()) {
            newErrors.domain = 'Domain is required';
        } else if (!/^[a-z0-9-]+$/.test(newTenant.domain)) {
            newErrors.domain = 'Domain can only contain lowercase letters, numbers and hyphens';
        }

        if (!newTenant.contactEmail.trim()) {
            newErrors.contactEmail = 'Contact email is required';
        } else if (!/\S+@\S+\.\S+/.test(newTenant.contactEmail)) {
            newErrors.contactEmail = 'Email is invalid';
        }

        if (!newTenant.contactPhone.trim()) {
            newErrors.contactPhone = 'Contact phone is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const tenantToAdd = {
            ...newTenant,
            id: isEditing ? newTenant.id : Date.now(),
            userCount: isEditing ? newTenant.userCount : 0,
            createdDate: isEditing ? newTenant.createdDate : new Date().toISOString().split('T')[0],
        };

        if (isEditing) {
            setTenants(tenants.map((t) => (t.id === newTenant.id ? tenantToAdd : t)));
        } else {
            setTenants([...tenants, tenantToAdd]);
        }

        handleCancel();
    };

    const handleSoftDelete = (tenantId) => {
        setTenants(tenants.map(tenant =>
            tenant.id === tenantId ? { ...tenant, status: 'Suspended' } : tenant
        ));
    };

    const handleCancel = () => {
        setNewTenant({
            id: 0,
            name: '',
            domain: '',
            contactEmail: '',
            contactPhone: '',
            status: 'Active',
            plan: 'Professional',
        });
        setIsEditing(false);
        setShowFormModal(false);
        setErrors({});
    };

    const handleInputChange = (field, value) => {
        setNewTenant({ ...newTenant, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleEdit = (tenant) => {
        setNewTenant({ ...tenant });
        setIsEditing(true);
        setShowFormModal(true);
    };

    return (
        <div className="tenant-management">
            <div className="tenant-header">
                <div>
                    <h2>Tenant Management</h2>
                    <p>Manage organizations and their settings</p>
                </div>
                <button className="add-tenant-btn" onClick={() => setShowFormModal(true)}>
                    <FaPlus /> Add Tenant
                </button>
            </div>

            <div className="tenant-controls">
                <input type="text" placeholder="Search tenants..." />
                <button>
                    <FaSearch /> Search
                </button>
                <button>
                    <FaFilter /> Filter
                </button>
            </div>

            <div className="tenant-stats">
                <div className="card blue">
                    <p>{tenants.length}</p>
                    <span>
                        <FaBuilding /> Total Tenants
                    </span>
                </div>
                <div className="card green">
                    <p>{tenants.filter(t => t.status === 'Active').length}</p>
                    <span>
                        <FaCheckCircle /> Active Tenants
                    </span>
                </div>
                <div className="card purple">
                    <p>{tenants.filter(t => t.plan === 'Enterprise').length}</p>
                    <span>
                        <FaBuilding /> Enterprise Plans
                    </span>
                </div>
                <div className="card orange">
                    <p>{tenants.reduce((sum, t) => sum + t.userCount, 0)}</p>
                    <span>
                        <FaUsers /> Total Users
                    </span>
                </div>
            </div>

            <div className="tenant-list">
                <h3>Organizations</h3>
                {tenants.map((tenant) => (
                    <div className="tenant-card" key={tenant.id}>
                        <div className="tenant-info">
                            <div className="tenant-top">
                                <strong>{tenant.name}</strong>
                                <span className={`badge status ${tenant.status.toLowerCase()}`}>
                                    {tenant.status === 'Active' ? <FaCheckCircle /> : <FaTimesCircle />}
                                    {tenant.status}
                                </span>
                                <span className="badge plan">{tenant.plan}</span>
                            </div>
                            <div className="tenant-middle">
                                <p>
                                    <FaGlobe /> {tenant.domain}.factoryapp.com
                                </p>
                                <p>
                                    <FaUsers /> {tenant.userCount} users
                                </p>
                                <p>Created: {tenant.createdDate}</p>
                            </div>
                            <div className="tenant-bottom">
                                <p>
                                    <FaEnvelope /> {tenant.contactEmail}
                                </p>
                                <p>
                                    <FaPhone /> {tenant.contactPhone}
                                </p>
                            </div>
                        </div>
                        <button className="edit-btn" onClick={() => handleEdit(tenant)}>
                            <FaEdit /> Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleSoftDelete(tenant.id)}
                        >
                            <FaTimes /> Delete
                        </button>
                    </div>
                ))}
            </div>

            {showFormModal && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <FaBuilding className="modal-icon" />
                                {isEditing ? 'Edit Tenant' : 'Add New Tenant'}
                            </h3>
                            <button className="close-btn" onClick={handleCancel}>
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="tenant-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <FaBuilding className="input-icon" />
                                        Tenant Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={newTenant.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={errors.name ? 'error' : ''}
                                        placeholder="Enter tenant name"
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="domain">
                                        <FaGlobe className="input-icon" />
                                        Domain *
                                    </label>
                                    <div className="domain-input">
                                        <input
                                            type="text"
                                            id="domain"
                                            value={newTenant.domain}
                                            onChange={(e) => handleInputChange('domain', e.target.value)}
                                            className={errors.domain ? 'error' : ''}
                                            placeholder="your-domain"
                                        />
                                        <span>.factoryapp.com</span>
                                    </div>
                                    {errors.domain && <span className="error-message">{errors.domain}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="contactEmail">
                                        <FaEnvelope className="input-icon" />
                                        Contact Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="contactEmail"
                                        value={newTenant.contactEmail}
                                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                        className={errors.contactEmail ? 'error' : ''}
                                        placeholder="Enter contact email"
                                    />
                                    {errors.contactEmail && <span className="error-message">{errors.contactEmail}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactPhone">
                                        <FaPhone className="input-icon" />
                                        Contact Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactPhone"
                                        value={newTenant.contactPhone}
                                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                        className={errors.contactPhone ? 'error' : ''}
                                        placeholder="Enter contact phone"
                                    />
                                    {errors.contactPhone && <span className="error-message">{errors.contactPhone}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="status">
                                        <FaCheckCircle className="input-icon" />
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        value={newTenant.status}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="plan">
                                        <FaBuilding className="input-icon" />
                                        Plan *
                                    </label>
                                    <select
                                        id="plan"
                                        value={newTenant.plan}
                                        onChange={(e) => handleInputChange('plan', e.target.value)}
                                    >
                                        {plans.map((plan) => (
                                            <option key={plan} value={plan}>
                                                {plan}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    {isEditing ? 'Update Tenant' : 'Create Tenant'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TenantManagement;