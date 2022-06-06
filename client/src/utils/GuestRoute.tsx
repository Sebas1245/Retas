import React from 'react';
import {
    Navigate, Outlet,
} from 'react-router-dom';
import { getToken } from '../services/tokenUtilities';

export default function GuestRoute() {
    const token = getToken();

    // Redirect them to the / (home) if there is a token
    return token ? <Navigate to={'/'}/> : <Outlet/>;
}