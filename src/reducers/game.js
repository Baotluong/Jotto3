const defaultGameState = {
    single : {
        difficulty: 0,
        secret: '',
        guesses: []
    }
}

export default (state = defaultGameState, action) => {
    switch (action.type) {
        case 'ADD_SECRET':
            return {
                ...state,
                [action.gameID]: {
                    ...state[action.gameID],
                    secret: action.secret,
                }
            };
        case 'ADD_GUESS':
            return {
                ...state,
                [action.gameID]: {
                    ...state[action.gameID],
                    guesses: [
                        ...state[action.gameID].guesses,
                        action.guess
                    ]
                }
            }
        default:
            return state;
    }
}