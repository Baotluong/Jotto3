import React from 'react';
import GameBoard from './GameBoard';

export const GamePage = (props) => (
    <div>
        <h3>Game Page</h3>
        <GameBoard
            gameID={props.match.params.id}
            {...props}
            />
    </div>
);

export default GamePage;