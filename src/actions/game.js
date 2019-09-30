import { npcSelectSecret, encryptor } from '../utility/gameUtilities';

export const addSecret = (playerNumber, secret) => ({
    type: 'ADD_SECRET',
    playerNumber,
    secret
});

export const startAddSecret = (gameID, playerNumber, secret) => {
    return (dispatch) => {
        return fetch(`/api/game/${gameID}`, {
            method: 'PUT',
            body: JSON.stringify({ playerNumber, secret: encryptor.encrypt(secret) }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (!res.ok)
                throw Error('Error: Unable to add secret.');
            return res.json();
        });
    };
};

export const addGuess = (guess, matches) => ({
    type: 'ADD_GUESS',
    guess,
    matches
});

export const startAddGuess = (gameID, guess, matches) => {
    return (dispatch) => {
        return fetch(`/api/game/${gameID}`, {
            method: 'PUT',
            body: JSON.stringify({ guess, matches }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (!res.ok)
                throw Error('Error: Unable to add guess.');
            return res.json();
        });
    };
};

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
            let playerNumber = '';
            if (userID === game.players.one.userID) {
                playerNumber = 'one';
            } else if (userID === game.players.two.userID) {
                playerNumber = 'two';
            } else if (!game.players.one.userID) {
                playerNumber = 'one';
                startAddNewPlayerToGame(gameID, playerNumber, userID);
            } else if (!game.players.two.userID) {
                playerNumber = 'two';
                startAddNewPlayerToGame(gameID, playerNumber, userID);
            } else {
                throw Error('Error: Game is full. You cannot join.');
            } 
            dispatch(setGame(game));
            game.myPlayerNumber = playerNumber;
            game.oppPlayerNumber = playerNumber === 'one' ? 'two' : 'one';
            return game;
        });
    } 
};

export const addPlayer = (playerNumber, userID) => ({
    type: 'ADD_PLAYER',
    playerNumber,
    userID
});

export const startAddNewPlayerToGame = (gameID, playerNumber, userID) => {
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

export const startGame = (isSinglePlayer = false) => {
    return (dispatch, getState) => {
        let body = { userID: getState().auth.uid };
        if (isSinglePlayer) {
            body.singlePlayerSecret = encryptor.encrypt(npcSelectSecret());
        }
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
            return game.gameID;
        });
    };
};