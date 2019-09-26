import React from 'react';
import { connect } from 'react-redux';
import GuessListItem from './GuessListItem';

export const MyGuessList = ({ guesses }) => (
    <div>
    <h3>My Guesses</h3>
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

export default MyGuessList;