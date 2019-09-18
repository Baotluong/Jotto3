import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => (
    <div>
        Dashboard page content

        <Link to="/game/solo">
            <h3>Single Player</h3>
        </Link>
        <button>Versus<span>(Real player)</span></button>
    </div>
);

export default DashboardPage;
