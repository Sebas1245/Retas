import React from 'react';
import {
    Navigate,
    Outlet,
    useLocation
} from 'react-router-dom';
import { getToken } from '../services/tokenUtilities';

export default function ProtectedRoute() {
    const location = useLocation();
    const token = getToken();

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return !token ? <Navigate to={'/login'} state={{ from: location}}/> : <Outlet/>;
}