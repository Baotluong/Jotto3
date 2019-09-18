import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import GuessList from './GuessList';
import { addSecret, addGuess } from '../actions/game';
import { encryptor, npcSelectSecret } from '../utility/secret';
import { checkForValidGuess } from '../utility/guess';
import encryptorCreator from 'simple-encryptor';

export class GameBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameID: this.props.gameID,
            secret: '',
            guesses: ''
        }
    }
    componentDidMount() {
        this.loadGame();
    }
    loadGame = () => {
        if (!this.props.secret) {
            this.startNewGame();
        }
    }
    startNewGame = () => {
        //TODO: Make these options later.
        const difficulty = 0;
        const secret = encryptor.encrypt(npcSelectSecret(difficulty));
        this.setState(() => ({
            secret
        }));
        this.props.addSecret(this.state.gameID, secret);
    }
    onSubmit = (guess) => {
        const error = checkForValidGuess(guess, this.state.guesses);
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
                <h3>Game Board {this.props.gameID}</h3>
                <GuessList gameID={this.props.gameID} />
                <GameForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );

    }
};

const mapStateToProps = (state, props) => ({
    secret: state.game[props.gameID].secret,
    gameID: props.gameID,
    guesses: state.game[props.gameID].guesses
});

const mapDispatchToProps = (dispatch, props) => ({
    addGuess: (gameID, guess) => dispatch(addGuess(gameID, guess)),
    addSecret: (gameID, secret) => dispatch(addSecret(gameID, secret))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);