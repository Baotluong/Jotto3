import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSinglePlayerGame } from '../actions/game';

const DashboardPage = ({ startSinglePlayerGame }) => (
    <div>
        Dashboard page conten
        <Link to="/game/solo">
            <h3>Single Player</h3>
        </Link>

        <button onClick={startSinglePlayerGame}>startSinglePlayerGame</button>
        <Link to="/vssetup">
            <h3>Versus Real Player</h3>
        </Link>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startSinglePlayerGame: () => dispatch(startSinglePlayerGame()),
});

export default connect(undefined, mapDispatchToProps)(DashboardPage);