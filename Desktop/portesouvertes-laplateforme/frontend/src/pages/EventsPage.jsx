import React from 'react';
import JPOList from '../components/JPOList';

function EventsPage() {
    return (
        <div>
            <h1>Nos événements</h1>
            <JPOList />
        </div>
    );
}

export default EventsPage;
// This page displays a list of events (JPOs) using the JPOList component.
// It serves as a dedicated page for users to explore upcoming events at La Plateforme.