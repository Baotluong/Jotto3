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
            <div className="content-container">
                <div className="dashboard__buttons">
                    {this.props.error && <p className="dashboard__error">{this.props.error}</p>}
                    <button 
                        onClick={this.startTwoPlayerGame}
                        className="button dashboard__button"
                    >
                        Versus Real Players
                    </button>
                    <button 
                        onClick={this.startSinglePlayerGame}
                        className="button dashboard__button"
                    >
                        Single Player Start
                    </button>
                    <Link to={`/game/${this.props.userID}`}>
                        <button
                            className="button dashboard__button"
                        >
                            Continue Single Player
                        </button>
                    </Link>           
                </div> 
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