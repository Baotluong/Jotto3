import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startGame } from '../actions/game';
import { clearError, redirectWithError } from '../actions/auth';

export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        this.props.clearError();
    }
    startSinglePlayerGame = () => {
        this.startGame(true);
    }
    startTwoPlayerGame = () => {
        this.startGame(false);
    }
    startGame = (isSinglePlayer) => {
        this.props.startGame(isSinglePlayer)
        .then((gameID) => {
            this.props.history.push(`game/${gameID}`);
        })
        .catch(error => {
            this.props.redirectWithError(error);
        });
    }
    render() {
        return (
            <div>
                {this.props.error && <p>{this.props.error}</p>}
                <button onClick={this.startSinglePlayerGame}>Start Single Player Game</button>
                <Link to={`/game/${this.props.userID}`}>
                    <button>Continue Single Player Game</button>
                </Link>           
                <button onClick={this.startTwoPlayerGame}>Versus Real Players</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    userID: state.auth.uid,
    error: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
    startGame: (isSinglePlayer) => dispatch(startGame(isSinglePlayer)),
    clearError: () => dispatch(clearError()),
    redirectWithError: (error) => dispatch(redirectWithError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);