import { npcSelectSecret, encryptor } from '../utility/gameUtilities';

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
        //TODO: remove console.log
        const secret = npcSelectSecret();
        console.log(secret)
        const bodyData = {
            userID: getState().auth.uid,
            singlePlayerSecret: encryptor.encrypt(secret)
        };
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