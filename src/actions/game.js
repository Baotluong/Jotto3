export const addSecret = (gameID, secret) => ({
    type: 'ADD_SECRET',
    gameID,
    secret
});

export const addGuess = (gameID, guess) => ({
    type: "ADD_GUESS",
    gameID,
    guess
});