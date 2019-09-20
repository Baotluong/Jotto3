import React from 'react';
import { connect } from 'react-redux';
import GuessListItem from './GuessListItem';

export const GuessList = ({ guesses }) => (
    <div>
        {
            guesses.length === 0 ? (
                <div>
                    <span>No Guesses</span>
                </div>
            ) : (
                guesses.map((guessData) => {
                    return <GuessListItem key={guessData.guess} guess={guessData.guess} matches={guessData.matches}/>;
                })
            )
        }
    </div>
);

const mapStateToProps = (state, props) => ({
    guesses: state.game.find(game => game.gameID === props.gameID).guesses
});

export default connect(mapStateToProps)(GuessList);