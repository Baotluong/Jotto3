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

const createGame = (userID) => {
    let newGame = new Game();
    Math.floor(Math.random() * 2) === 0  ? newGame.players.one.userID = userID : newGame.players.two.userID = userID;
    return database.ref('games').push(newGame)
        .then((ref) => {
            newGame.gameID = ref.key;
            return newGame;
        }
    );
};

const getGameByID = (gameID) => {
    return database.ref(`games/${gameID}`).once('value');
};

const updateGameByID = (gameID, { guess, matches, joiningPlayerID, secretPlayerNumber, secretWord }) => {
    if (guess && matches) {
        return addGuessToGame(gameID, guess, matches);
    }
    if (joiningPlayerID) {
        return addJoiningPlayer(gameID, joiningPlayerID);
    }
    if (secretPlayerNumber && secretWord) {
        return addSecretToGame(gameID, secretPlayerNumber, secretWord);
    }
    return Promise.reject('ERROR: No updates were made');
};

const addGuessToGame = (gameID, guess, matches) => {
    return database.ref(`games/${gameID}/guesses`).push({
      guess,
      matches
    }).then(() => {
        return `SUCCESS: ${guess} was added to game ${gameID}.`
    });
};

const addJoiningPlayer = (gameID, joiningPlayerID) => {
    return database
        .ref(`games/${gameID}/players/`)
        .once('value')
        .then((snapshot) => {
            const value = snapshot.val();
            let joiningPlayerNumber = '';
            if (!value) {
                throw new Error('ERROR: GameID not found.');
            } else if (value.one.userID && value.two.userID) {
                throw new Error('ERROR: Game is full. You cannot join.');
            }
            joiningPlayerNumber = value && !value.one.userID ? 'one' : 'two';

            return database.ref(`games/${gameID}/players/${joiningPlayerNumber}/userID`).set(joiningPlayerID).then(() => {
                return `SUCCESS: ${joiningPlayerID} has joined as player ${joiningPlayerNumber}.`;
            });
        }
    );
}

const addSecretToGame = (gameID, playerNumber, word) => {
    return database.ref(`games/${gameID}/players/${playerNumber}/secret`).set(word).then(() => {
        return `SUCCESS: Secret was added for player ${playerNumber}.`;
    });
}

module.exports = {
    getGameByID,
    createGame,
    updateGameByID
};