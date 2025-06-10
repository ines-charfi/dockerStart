import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import UserEventsPage from './pages/UserEventsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import JPOItem from './components/JPOItem';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/jpo/:id" element={<JPOItem />} />
                <Route path="/my-events" element={<ProtectedRoute><UserEventsPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
// This is the main application component that sets up the routing for the entire app.
// It includes routes for the home page, login, registration, events, user events, profile, and admin dashboard.
// The ProtectedRoute component is used to ensure that certain pages are only accessible to authenticated users.
// The Header and Footer components are included to provide consistent navigation and footer across all pages.
// The JPOItem component is used to display details of a specific event when accessed via its ID in the URL.
// The app uses React Router for navigation and conditional rendering based on user authentication status.
// The Header component provides navigation links, and the Footer component is included at the bottom of the page.
// The app is structured to allow easy expansion and maintenance, with separate components for each page and functionality.   