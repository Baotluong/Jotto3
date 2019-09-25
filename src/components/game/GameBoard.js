import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import GameForm from './GameForm';
import GameInvitePlayer from './GameInvitePlayer';
import GuessList from './GuessList';
import SecretSelector from './SecretSelector';
import LoadingPage from '../LoadingPage';
import { startAddSecret, startLoadGame, startAddGuess, addGuess, addPlayer, addSecret } from '../../actions/game';
import { redirectWithError } from '../../actions/auth';
import { compareGuessToSecret, checkForValidGuess, checkForValidSecret } from '../../utility/gameUtilities';

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
            oppUserID: '',
            guesses: [],
            isSinglePlayer: ''
        };
    }
    componentDidMount() {
        this.loadGame();
        var socket = io();
        socket.emit('join', this.state.gameID);
        socket.on('updates', updates => {
            console.log(updates);
            this.handleGameUpdates(updates);
        });
    }
    handleGameUpdates = (updates) => {
        switch (updates.action) {
            case 'ADD_GUESS':
                this.props.addGuess(updates.guess, updates.matches);
                this.setState(() => ({
                    guesses: [
                        ...this.state.guesses,
                        { guess: updates.guess, matches: updates.matches }
                    ]
                }));
                break;
            case 'ADD_PLAYER':
                this.props.addPlayer(updates.playerNumber, updates.userID);
                if(updates.playerNumber !== this.state.myPlayerNumber) {
                    console.log('here')
                    this.setState(() => ({
                        oppUserID: updates.userID,
                    }));
                }
                console.log(updates.playerNumber, updates.userID);
                break;
            case 'ADD_SECRET':
                this.props.addSecret(updates.playerNumber, updates.secret);
                if (updates.playerNumber === this.state.myPlayerNumber) {
                    this.setState(() => ({
                        mySecret: updates.secret,
                    }));
                } else {
                    this.setState(() => ({
                        oppSecret: updates.secret,
                    }));
                }
                break;
            default:
                console.log('Unrecognized update:', updates);
        }
    }
    loadGame = () => {
        this.setState({ isLoading: true });
        this.props.startLoadGame(this.state.gameID, this.props.userID)
        .then(game => {
            this.setState({
                isLoading: false,
                myPlayerNumber: game.players.one.userID === this.props.userID ? 'one' : 'two',
                mySecret: game.players.one.userID === this.props.userID ? game.players.one.secret : game.players.two.secret,
                oppSecret: game.players.one.userID === this.props.userID ? game.players.two.secret : game.players.one.secret,
                oppUserID: game.players.one.userID === this.props.userID ? game.players.two.userID : game.players.one.userID,               
                guesses: game.guesses,
                isSinglePlayer: game.players.two.userID === 'Computer'
            });
        })
        .catch((error) => {
            this.props.redirectWithError(error.message);
        });
    }
    onSubmitGuess = (guess) => {
        const error = checkForValidGuess(guess, this.state.guesses);
        if (!error) {
            const matches = compareGuessToSecret(guess, this.state.oppSecret);
            this.props.startAddGuess(this.state.gameID, guess, matches)
            .catch(e => {
                console.log(e);
                return 'Unable to make guess. Please try again.';
            });
            if (matches < 0){
                return "You've won!";
            }
        }
        return error;
    }
    onSubmitSecret = (secret) => {
        const error = checkForValidSecret(secret);
        if (!error) {
            this.props.startAddSecret(this.state.gameID, this.state.myPlayerNumber, secret)
            .catch(e => {
                console.log(e);
                return 'Unable to add secret. Please try again.';
            });
        }
        return error;
    }
    isMyTurn = () => {
        const isGameStarted = this.state.mySecret && this.state.oppSecret;
        const whichPlayersTurnIsIt = this.state.guesses.length % 2 === 0 ? 'one' : 'two';
        
        return this.state.isSinglePlayer 
            || isGameStarted && whichPlayersTurnIsIt === this.state.myPlayerNumber; 
    }
    render () {
        if (this.state.isLoading) {
            return <LoadingPage />;
        }
        return (
            <div>
                <h3>Game Board</h3>
                { !this.state.oppUserID && <GameInvitePlayer /> }
                { (!this.state.isSinglePlayer && !this.state.mySecret) && <SecretSelector onSubmitSecret={this.onSubmitSecret}/> }
                <GameForm
                    onSubmit={this.onSubmitGuess}
                    isDisabled={!this.isMyTurn()}
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
    startAddGuess: (gameID, guess, matches) => dispatch(startAddGuess(gameID, guess, matches)),
    addGuess: (guess, matches) => dispatch(addGuess(guess, matches)),
    startAddSecret: (gameID, playerNumber, secret) => dispatch(startAddSecret(gameID, playerNumber, secret)),
    addSecret: (playerNumber, secret) => dispatch(addSecret(playerNumber, secret)),
    addPlayer: (playerNumber, userID) => dispatch(addPlayer(playerNumber, userID)),
    startLoadGame: (gameID, userID) => dispatch(startLoadGame(gameID, userID)),
    redirectWithError: (error) => dispatch(redirectWithError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);