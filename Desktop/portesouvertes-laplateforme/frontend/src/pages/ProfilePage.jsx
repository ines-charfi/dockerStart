import React from 'react';

function ProfilePage() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            <h1>Mon profil</h1>
            {user && <p>Bonjour {user.name} ({user.email})</p>}
        </div>
    );
}

export default ProfilePage;
// This page displays the user's profile information.
// It retrieves the user's data from local storage and shows their name and email.