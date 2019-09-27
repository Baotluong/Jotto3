const firebase = require('./firebase');
const database = firebase.database;

// Games
class Game {
    constructor() {
        this.players = {
            one: {
                userID: '',
                secret: '',
            },
            two: {
                userID: '',
                secret: ''
            }
        };
        this.guesses = [];
        this.gameOptions = {
            allowDuplicateGuesses: false
        };
    }
}

const createGame = ({ userID, singlePlayerSecret }) => {
    let newGame = new Game();    
    if (singlePlayerSecret) {
        newGame.players.one.userID = userID;
        newGame.players.two.userID = 'Computer';
        newGame.players.two.secret = singlePlayerSecret;
        return database.ref(`games/${userID}`).set(newGame)
        .then(() => {
            newGame.gameID = userID;
            return newGame;
        });
    } else {
        Math.floor(Math.random() * 2) === 0  ? newGame.players.one.userID = userID : newGame.players.two.userID = userID;
        return database.ref('games').push(newGame)
            .then((ref) => {
                newGame.gameID = ref.key;
                return newGame;
            }
        );
    }
};

const getGameByID = (gameID) => {
    return database.ref(`games/${gameID}`)
        .once('value')
        .then((snapshot) => {
            const game = snapshot.val();
            if (!game)
                throw Error('GameID not found.');
            // This is needed because firebase won't store an empty array.
            if (!game.guesses)
                game.guesses = [];

            game.guesses = Object.values(game.guesses);    
            game.gameID = gameID;
            return game;
        }
    );
};

const updateGameByID = (gameID, { guess, matches, userID, playerNumber, secret }) => {
    if (guess && Number.isInteger(matches)) {
        return addGuessToGame(gameID, guess, matches);
    }
    if (userID && playerNumber) {
        return addPlayer(gameID, playerNumber, userID);
    }
    if (playerNumber && secret) {
        return addSecretToGame(gameID, playerNumber, secret);
    }
    return Promise.reject('No updates were made');
};

const addGuessToGame = (gameID, guess, matches) => {
    return database.ref(`games/${gameID}/guesses`).push({
      guess,
      matches
    }).then((ref) => {
        return { action: 'ADD_GUESS', guess, matches };
    }).catch(error => {
        return { error };
    });
};

const addPlayer = (gameID, playerNumber, userID) => {
    return database.ref(`games/${gameID}/players/${playerNumber}/userID`).set(userID)
    .then(() => {
        return { action: 'ADD_PLAYER', playerNumber, userID };
    }).catch(error => {
        return { error };
    });
}

const addSecretToGame = (gameID, playerNumber, secret) => {
    return database.ref(`games/${gameID}/players/${playerNumber}/secret`).set(secret)
    .then(() => {
        return { action: 'ADD_SECRET', playerNumber, secret };
    }).catch(error => {
        return { error };
    });
}

module.exports = {
    getGameByID,
    createGame,
    updateGameByID
};