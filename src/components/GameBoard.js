import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import { addSecret, addGuess } from '../actions/game';
import { encryptor, npcSelectSecret } from '../utility/secret';

export class GameBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gameID: 'single',
            secret: ''
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
        this.props.addGuess(this.state.gameID, guess);
    } 
    render () {
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

const mapStateToProps = (state, props) => ({
    secret: state.game.single.secret,
    gameID: 'single'
});

const mapDispatchToProps = (dispatch, props) => ({
    addGuess: (gameID, guess) => dispatch(addGuess(gameID, guess)),
    addSecret: (gameID, secret) => dispatch(addSecret(gameID, secret))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);