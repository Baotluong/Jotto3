import React from 'react';
import { connect } from 'react-redux';
import GuessListItem from './GuessListItem';

export const OppGuessList = ({ guesses }) => (
    <div>
        {   
            guesses.length !== 0 &&
            (
                <div>
                    <h3>Opponent's Guesses</h3>
                    { guesses.map((guessData) => {
                        return <GuessListItem key={guessData.guess} guess={guessData.guess} matches={guessData.matches}/>;
                    })}
                </div>
            )
        }
    </div>
);

export default OppGuessList;