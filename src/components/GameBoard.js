import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import GuessList from './GuessList';
import { addSecret, addGuess } from '../actions/game';
import { encryptor, npcSelectSecret } from '../utility/secret';
import { checkForValidGuess } from '../utility/guess';

export class GameBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameID: this.props.gameID,
            ...this.props.gameData
        };
    }
    componentDidMount() {
        this.loadGame();
    }
    loadGame = () => {
        if (!this.state.secret) {
            this.startNewGame();
        }
        //TODO: Do we need to do anything for continued games?
        //Otherwise we can merge this and startNewGame
    }
    startNewGame = () => {
        //TODO: Make these options later.
        const difficulty = 0;
        const secret = encryptor.encrypt(npcSelectSecret(difficulty));
        //TODO: Remove this later
        console.log(encryptor.decrypt(secret));
        this.setState(() => ({
            secret
        }));
        this.props.addSecret(this.state.gameID, secret);
    }
    onSubmit = (guess) => {
        const error = checkForValidGuess(guess, this.state.guesses);
        console.log(error);
        if (!error) {
            this.props.addGuess(this.state.gameID, guess);
            this.setState(() => ({
                guesses: [...this.state.guesses, guess]
            }));
        }
        return error;
    } 
    render () {
        return (
            <div>
                <h3>Game Board</h3>
                <GuessList gameID={this.props.gameID} />
                <GameForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );

    }
};

const mapStateToProps = (state, props) => {
    return {
        gameID: props.gameID,
        gameData: state.game.find(game => game.gameID === props.gameID)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    addGuess: (gameID, guess) => dispatch(addGuess(gameID, guess)),
    addSecret: (gameID, secret) => dispatch(addSecret(gameID, secret))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);