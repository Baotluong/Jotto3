const defaultGameState = [
    {
        gameID: 'solo',
        difficulty: 0,
        secret: '',
        guesses: []
    }
];

export default (state = defaultGameState, action) => {
    switch (action.type) {
        case 'ADD_SECRET':
            return state.map((game) => {
                if (game.gameID === action.gameID) {
                    return {
                        ...game,
                        secret: action.secret
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
                            action.guess
                        ]
                    }
                }
            });
        default:
            return state;
    }
}