import React from 'react';
import GameBoard from './GameBoard';

export const GamePage = (props) => (
    <div>
        <GameBoard
            gameID={props.match.params.id}
            />
    </div>
);

export default GamePage;