import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

function AdminPage() {
    return (
        <div>
            <h1>Tableau de bord Admin</h1>
            <AdminDashboard />
        </div>
    );
}

export default AdminPage;
// This page serves as the admin dashboard for managing events and users.
// It includes the AdminDashboard component, which provides functionalities for administrators to oversee and control the platform's operations.