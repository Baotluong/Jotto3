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

export const setGame = (game) => ({
    type: 'ADD_GAME',
    game
});

export const startLoadGame = (gameID, userID) => {
    return (dispatch) => {
        return fetch(`/api/game/${gameID}`)
        .then(res => {
            if (!res.ok)
                throw Error('Error: Game was not found.');
            return res.json();
        })
        .then(game => {
            if (!(userID === game.players.one.userID || userID === game.players.two.userID)) {
                let playerNumber = '';
                if (!game.players.one.userID) {
                    playerNumber = 'one';
                } else if (!game.players.two.userID) {
                    playerNumber = 'two';
                } else {
                    throw Error('Error: Game is full. You cannot join.');
                }
                startAddPlayer(gameID, playerNumber, userID)
                .then(() => {
                    dispatch(addPlayer(playerNumber, userID));
                });
            } 
            dispatch(setGame(game));
            return game;
        });
    } 
};

export const addPlayer = (playerNumber, userID) => ({
    type: 'ADD_PLAYER',
    playerNumber,
    userID
});

export const startAddPlayer = (gameID, playerNumber, userID) => {
    return fetch(`/api/game/${gameID}`, {
        method: 'PUT',
        body: JSON.stringify({
            playerNumber,
            userID
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        if (!res.ok)
            throw Error('Error: Unable to add player.');
        return res.json();
    });
};

export const startSinglePlayerGame = () => {
    return (dispatch, getState) => {
        //TODO: remove console.log
        const secret = npcSelectSecret();
        console.log(secret);
        const body = {
            userID: getState().auth.uid,
            singlePlayerSecret: encryptor.encrypt(secret)
        };
        return fetch('/api/game', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(!res.ok)
                throw Error('Error: Unable to start new game. Try again.');
            return res.json();
        }).then(game => {
            dispatch(setGame(game));
        });
    };
};