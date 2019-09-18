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
                guesses.map((guess) => {
                    return <GuessListItem key={guess} guess={guess}/>;
                })
            )
        }
    </div>
);

const mapStateToProps = (state, props) => ({
    guesses: state.game[props.gameID].guesses
});

export default connect(mapStateToProps)(GuessList);