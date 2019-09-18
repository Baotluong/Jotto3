import React from 'react';
import { connect } from 'react-redux';
import GameForm from './GameForm';
import { addGuess } from '../actions/guess';

export class GameBoard extends React.Component {
    constructor(props){
        super(props);
    }
    onSubmit = (guess) => {
        this.props.addGuess(guess);
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

const mapDispatchToProps = (dispatch, props) => ({
    addGuess: (guess) => dispatch(addGuess(guess))
});

export default connect(undefined, mapDispatchToProps)(GameBoard);