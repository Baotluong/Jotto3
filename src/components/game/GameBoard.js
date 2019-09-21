import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import GuessList from './GuessList';
import { addSecret, addGuess } from '../../actions/game';
import {
    encryptor,
    npcSelectSecret,
    compareGuessToSecret,
    checkForValidGuess
} from '../../utility/gameUtilities';

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
        // this.loadGame();
        this.loadGame();
    }
    loadGame = () => {
        this.setState({ isLoading: true });
        fetch(`/api/game/${this.state.gameID}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ isLoading: false, ...data });
            }).catch(e => {
                this.setState({ isLoading: false });
                this.props.history.push('/');
            });
        // if (!this.state.secret) {
        //     this.startNewGame();
        // }
        // //TODO: Do we need to do anything for continued games?
        // //Otherwise we can merge this and startNewGame
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

// const mapStateToProps = (state, props) => {
//     const gameData = state.game.find(game => game.gameID === props.gameID);
//     const playerNumber = gameData.players.one.userID === state.auth.uid ? 1 : 2;
//     return {
//         gameID: props.gameID,
//         gameData,
//         playerNumber
//     };
// };

const mapDispatchToProps = (dispatch, props) => ({
    addGuess: (gameID, guess) => dispatch(addGuess(gameID, guess)),
    addSecret: (gameID, playerNumber, secret) => dispatch(addSecret(gameID, playerNumber, secret))
});

export default connect(undefined, mapDispatchToProps)(GameBoard);