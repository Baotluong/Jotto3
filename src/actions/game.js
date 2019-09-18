export const addSecret = (gameID, secret) => ({
    type: 'ADD_SECRET',
    gameID,
    secret
});

export const addGuess = (gameID, guessData) => ({
    type: "ADD_GUESS",
    gameID,
    guessData
});