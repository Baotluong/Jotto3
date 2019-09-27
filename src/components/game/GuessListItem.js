import React from 'react';

const GuessListItem = ({ guess, matches }) => (
    <div>
        <h3>{guess} - {matches >= 0 ? matches : 'Winner'}</h3>
    </div>
);

export default GuessListItem;