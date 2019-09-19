import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => (
    <div>
        Dashboard page content

        <Link to="/game/solo">
            <h3>Single Player</h3>
        </Link>
        <Link to="/vssetup">
            <h3>Versus Real Player</h3>
        </Link>
    </div>
);

export default DashboardPage;