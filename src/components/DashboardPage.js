import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSinglePlayerGame } from '../actions/game';
import { clearError, redirectWithError } from '../actions/auth';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        this.props.clearError();
    }
    onClick = () => {
        this.props.startSinglePlayerGame()
        .then(() => {
            this.props.history.push(`game/${this.props.userID}`);
        })
        .catch(error => {
            this.props.redirectWithError(error);
        });
    }
    render() {
        return (
            <div>
                {this.props.error && <p>{this.props.error}</p>}
                <button onClick={this.onClick}>startSinglePlayerGame</button>
                <Link to="/vssetup">
                    <h3>Versus Real Player</h3>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    userID: state.auth.uid,
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    startSinglePlayerGame: () => dispatch(startSinglePlayerGame()),
    clearError: () => dispatch(clearError()),
    redirectWithError: (error) => dispatch(redirectWithError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);