import React from 'react';
import GuessListItem from './GuessListItem';
import MyGuessListPopUp from './MyGuessListPopUp';

export const MyGuessList = ({ guesses }) => (
    <div>
        {
            guesses.length !== 0 &&
            (
                <div className="guess-list__box">
                    <div className="guess-list__title-row">
                        <h3 className="guess-list__title">My Guesses</h3>
                        <MyGuessListPopUp />
                    </div>
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

export default MyGuessList;