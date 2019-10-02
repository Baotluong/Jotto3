import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client/dist/socket.io'
import GameForm from './GameForm';
import GameInvitePlayer from './GameInvitePlayer';
import LetterTracker from './LetterTracker';
import MyGuessList from './MyGuessList';
import OppGuessList from './OppGuessList';
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
        this.socket = io();
    }
    componentDidMount() {
        this.loadGame();
        this.socket.emit('join', this.state.gameID);
        this.socket.on('updates', updates => {
            this.handleGameUpdates(updates);
        });
    }
    componentWillUnmount() {
        this.socket.disconnect();
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
                if (updates.userID === this.props.userID) {
                    this.setState(() => ({
                        myPlayerNumber: updates.playerNumber,
                        oppUserID: updates.oppUserID
                    }));
                } else {
                    this.setState(() => ({
                        oppUserID: updates.userID
                    }));
                }
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
                myPlayerNumber: game.myPlayerNumber,
                mySecret: game.players[game.myPlayerNumber].secret,
                oppSecret: game.players[game.oppPlayerNumber].secret,
                oppUserID: game.players[game.oppPlayerNumber].userID,
                guesses: game.guesses,
                isSinglePlayer: game.players.two.userID === 'Computer'
            });
        })
        .catch((error) => {
            this.props.redirectWithError(error.message);
        });
    }
    onSubmitGuess = (guess) => {
        const error = checkForValidGuess(guess, this.getMyGuessList());
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
    isGameStarted = () => {
        return this.state.isSinglePlayer || (this.state.mySecret && this.state.oppSecret);
    }
    isMyTurn = () => {
        const whichPlayersTurnIsIt = this.state.guesses.length % 2 === 0 ? 'one' : 'two';
        
        return this.state.isSinglePlayer || 
            (this.isGameStarted && whichPlayersTurnIsIt === this.state.myPlayerNumber); 
    }
    getMyGuessList = () => {
        if (this.state.isSinglePlayer)
            return this.state.guesses;
            
        return this.state.guesses.filter((value, index) => index % 2 === (this.state.myPlayerNumber === 'one' ? 0 : 1));
    }
    getOppGuessList = () => {
        if (this.state.isSinglePlayer)
            return [];
        return this.state.guesses.filter((value, index) => index % 2 === (this.state.myPlayerNumber === 'one' ? 1 : 0));
    }
    render () {
        if (this.state.isLoading) {
            return <LoadingPage />;
        }
        return (
            <div className="content-container">
                { this.isGameStarted() &&
                    <div className="game__guesses">
                        <OppGuessList guesses={ this.getOppGuessList() } />
                        <LetterTracker />
                        <MyGuessList guesses={ this.getMyGuessList() } />
                    </div>
                }
                { !this.state.oppUserID && <GameInvitePlayer /> }
                { (!this.state.isSinglePlayer && !this.state.mySecret) && <SecretSelector onSubmitSecret={this.onSubmitSecret}/> }
                { this.isGameStarted() &&
                    <GameForm
                        onSubmit={this.onSubmitGuess}
                        isDisabled={!this.isMyTurn()}
                    />
                }
                { !this.isGameStarted() && this.state.mySecret && this.state.oppUserID && 
                    <div className="gameboard__waiting-message">
                        Waiting on your opponent... zzz...
                    </div>
                }
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