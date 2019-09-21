import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSinglePlayerGame } from '../actions/game';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }
    onClick = () => {
        this.props.startSinglePlayerGame();
        this.props.history.push(`game/${this.props.userID}`);
    }
    render() {
        return (
            <div>
                Dashboard page content
                <button onClick={this.onClick}>startSinglePlayerGame</button>
                <Link to="/vssetup">
                    <h3>Versus Real Player</h3>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    userID: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startSinglePlayerGame: () => dispatch(startSinglePlayerGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);