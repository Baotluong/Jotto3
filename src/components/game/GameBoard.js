import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import GameForm from './GameForm';
import GuessList from './GuessList';
import { addSecret, addGuess, startLoadGame } from '../../actions/game';
import { redirectWithError } from '../../actions/auth';
import { compareGuessToSecret, checkForValidGuess } from '../../utility/gameUtilities';

export class GameBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameID: this.props.gameID,
            ...this.props.gameData,
            error: '',
            isLoading: false,
        };
    }
    componentDidMount() {
        this.loadGame();
        var socket = io();
        socket.emit('join', this.state.gameID);
        socket.on('updates', data => {
            console.log('players', data);
        });
    }
    loadGame = () => {
        this.setState({ isLoading: true });
        this.props.startLoadGame(this.state.gameID, this.props.userID)
        .then(game => {
            this.setState({ isLoading: false, ...game });
        })
        .catch((error) => {
            this.props.redirectWithError(error.message);
        });
    }
    onSubmit = (guess) => {
        const error = checkForValidGuess(guess, this.state.guesses);
        if (!error) {
            const guessData = {
                guess,
                matches: compareGuessToSecret(guess, this.state.secret)
            };
            this.props.addGuess(this.state.gameID, guessData);
            this.setState(() => ({
                guesses: [
                    ...this.state.guesses,
                    guessData
                ]
            }));
            if (guessData.matches < 0){
                return "you won";
            }
        }
        return error;
    } 
    render () {
        if (this.state.isLoading) {
            return (<p>im loading hang on</p>);
        }
        return (
            <div>
                <h3>Game Board</h3>
                <GameForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );

    }
};

const mapStateToProps = (state, props) => {
    return {
        userID: state.auth.uid,
    }
};

const mapDispatchToProps = (dispatch, props) => ({
    addGuess: (gameID, guess) => dispatch(addGuess(gameID, guess)),
    addSecret: (gameID, playerNumber, secret) => dispatch(addSecret(gameID, playerNumber, secret)),
    startLoadGame: (gameID, userID) => dispatch(startLoadGame(gameID, userID)),
    redirectWithError: (error) => dispatch(redirectWithError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);