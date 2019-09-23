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
        newGame.players.two.userID = 'None';
        newGame.players.two.secret = singlePlayerSecret;
        return database.ref(`games/${userID}`).set(newGame)
            .then(() => {
                newGame.gameID = userID;
                return newGame;
            }
        );
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
            if (!game) {
                throw Error('GameID not found.');
            }
            game.gameID = gameID;
            return game;
        }
    );
};

const updateGameByID = (gameID, { guess, matches, userID, playerNumber, secretWord }) => {
    if (guess && matches) {
        return addGuessToGame(gameID, guess, matches);
    }
    if (userID && playerNumber) {
        return addPlayer(gameID, playerNumber, userID);
    }
    if (playerNumber && secretWord) {
        return addSecretToGame(gameID, playerNumber, secretWord);
    }
    return Promise.reject('No updates were made');
};

const addGuessToGame = (gameID, guess, matches) => {
    return database.ref(`games/${gameID}/guesses`).push({
      guess,
      matches
    }).then(() => {
        return `${guess} was added to game ${gameID}.`
    });
};

const addPlayer = (gameID, playerNumber, userID) => {
    // return database
    //     .ref(`games/${gameID}/players/`)
    //     .once('value')
    //     .then((snapshot) => {
    //         const value = snapshot.val();
    //         if (!value) {
    //             throw new Error('ERROR: GameID not found.');
    //         } else if (value.one.userID && value.two.userID) {
    //             throw new Error('ERROR: Game is full. You cannot join.');
    //         }

            return database.ref(`games/${gameID}/players/${playerNumber}/userID`).set(userID).then(() => {
                return `${userID} has joined as player ${playerNumber}.`;
            });
    //     }
    // );
}

const addSecretToGame = (gameID, playerNumber, word) => {
    return database.ref(`games/${gameID}/players/${playerNumber}/secret`).set(word).then(() => {
        return `Secret was added for player ${playerNumber}.`;
    });
}

module.exports = {
    getGameByID,
    createGame,
    updateGameByID
};