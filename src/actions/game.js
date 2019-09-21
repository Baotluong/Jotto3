export const addSecret = (gameID, playerNumber, secret) => ({
    type: 'ADD_SECRET',
    gameID,
    playerNumber,
    secret
});

export const addGuess = (gameID, guessData) => ({
    type: 'ADD_GUESS',
    gameID,
    guessData
});

export const addGame = (game) => ({
    type: 'ADD_GAME',
    game
});

export const startSinglePlayerGame = () => {
    return (dispatch, getState) => {

        const bodyData = { userID: getState().auth.uid };
        return fetch('/api/game', {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            return res.json();
        }).then(game => {
            dispatch(addGame(game));
        });
    };
}