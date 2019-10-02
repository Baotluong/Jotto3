import React from 'react';
import GuessListItem from './GuessListItem';

export const OppGuessList = ({ guesses }) => (
    <div>
        {   
            guesses.length !== 0 &&
            (
                <div className="guess-list__box">
                    <h3 className="guess-list__title">Opponent Guesses</h3>
                    <div className="guess-list__guess-row">
                        { guesses.map((guessData) => {
                            return <GuessListItem key={guessData.guess} guess={guessData.guess} matches={guessData.matches}/>;
                        })}
                    </div>
                </div>
            )
        }
    </div>
);

export default OppGuessList;