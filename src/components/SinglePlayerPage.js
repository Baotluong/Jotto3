import React from 'react';
import { connect } from 'react-redux';
import GameBoard from '../components/GameBoard';
import { encryptor, npcSelectSecret } from '../utility/secret';
import { addSinglePlayerSecret } from '../actions/game';

export class SinglePlayerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.props.addSinglePlayerSecret(secret);
    }
    render () {
        return (
            <div>
                <h3>SinglePlayerPage</h3>
                <GameBoard />
            </div>
        );

    }
};

const mapStateToProps = (state, props) => ({
    secret: state.game.single.secret
});

const mapDispatchToProps = (dispatch, props) => ({
    addSinglePlayerSecret: (secret) => dispatch(addSinglePlayerSecret(secret))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlayerPage);