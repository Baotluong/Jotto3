import React from 'react';

const GuessListItem = ({ guess, matches }) => (
    <div className="guess-list-item__box">
            <span className="guess-list-item__guess">{guess.toUpperCase()} - </span>
            <span className={matches >= 0 ? "guess-list-item__matches" : "guess-list-item__matches--winner"}>
                {matches >= 0 ? matches : 'W'}
            </span>
    </div>
);

export default GuessListItem;