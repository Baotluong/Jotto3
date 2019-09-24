import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import GameForm from './GameForm';
import GuessList from './GuessList';
import { addSecret, startAddGuess, startLoadGame } from '../../actions/game';
import { redirectWithError } from '../../actions/auth';
import { compareGuessToSecret, checkForValidGuess } from '../../utility/gameUtilities';

export class GameBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameID: this.props.gameID,
            error: '',
            isLoading: false,
            myPlayerNumber: '',
            mySecret: '',
            oppSecret: '',
            guesses: []
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
            this.setState({
                isLoading: false,
                myPlayerNumber: game.players.one.userID === this.props.userID ? 1 : 2,
                mySecret: game.players.one.userID === this.props.userID ? game.players.one.secret : game.players.two.secret,
                oppSecret: game.players.one.userID === this.props.userID ? game.players.two.secret : game.players.one.secret,                
                guesses: game.guesses,
            });
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
                matches: compareGuessToSecret(guess, this.state.oppSecret)
            };
            this.props.startAddGuess(this.state.gameID, guessData)
            .then(() => {
                console.log(this.state.guesses);
                console.log(...this.state.guesses);
                this.setState(() => ({
                    guesses: [
                        ...this.state.guesses,
                        guessData
                    ]
                }));
            }).catch(e => {
                console.log(e);
                return 'Unable to make guess. Please try again.';
            });
            if (guessData.matches < 0){
                return "You've won!";
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

const mapStateToProps = (state) => {
    return {
        userID: state.auth.uid,
    }
};

const mapDispatchToProps = (dispatch) => ({
    startAddGuess: (gameID, guessData) => dispatch(startAddGuess(gameID, guessData)),
    addSecret: (playerNumber, secret) => dispatch(addSecret(playerNumber, secret)),
    startLoadGame: (gameID, userID) => dispatch(startLoadGame(gameID, userID)),
    redirectWithError: (error) => dispatch(redirectWithError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);