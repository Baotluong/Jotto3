const defaultGameState = {
    single : {
        difficulty: 0,
        secret: ''
    },
    versus: {
        gameID:'',
        secret: ''
    }
}

export default (state = defaultGameState, action) => {
    switch (action.type) {
        case 'ADD_SINGLE_SECRET':
            return {
                ...state,
                single: {
                    ...state.single,
                    secret: action.secret
                }
            };
        default:
            return state;
    }
}