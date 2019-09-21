export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_GAME':
            return [
                ...state,
                action.game
            ];
        case 'ADD_SECRET':
            return state.map((game) => {
                if (game.gameID === action.gameID) {
                    return {
                        ...game,
                        players: {
                            ...game.players,
                            [action.playerNumber]: {
                                ...action.playerNumber,
                                secret: action.secret
                            }
                        }
                    };
                } else {
                    return game;
                }
            });
        case 'ADD_GUESS':
            return state.map((game) => {
                if (game.gameID === action.gameID) {
                    return {
                        ...game,
                        guesses: [
                            ...game.guesses,
                            action.guessData
                        ]
                    }
                }
            });
        default:
            return state;
    }
}