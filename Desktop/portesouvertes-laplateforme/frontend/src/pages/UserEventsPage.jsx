import React from 'react';
import UserEvents from '../components/UserEvents';

function UserEventsPage() {
    return (
        <div>
            <h1>Mes inscriptions</h1>
            <UserEvents />
        </div>
    );
}

export default UserEventsPage;
// This page displays the user's registered events by using the UserEvents component.
// It allows users to view and manage their event registrations at La Plateforme.
