// // TODO: Remove this default in finished product
// const defaultGameState = 
//     {
//         gameOptions : {
//             allowDuplicateGuesses: false
//         },
//         players: {
//             one: {
//             secret: "",
//             userID: "71337f4c-e57a-4277-8b4c-3a55d0cb021f"
//             },
//             two: {
//             secret: "8032571f1941a6c0d6cdb2b1487f389aabcdcc364bdaa54eddddbf6c69c447680a877a6cb8e860ceb86aedc27cb52b69D7eF6hWUKu2JbwfxAbvsDA==",
//             userID: ""
//             }
//         },
//         gameID: "71337f4c-e57a-4277-8b4c-3a55d0cb021f",
//         guesses: []
//     };
const defaultGameState = {};

export default (state = defaultGameState, action) => {
    switch (action.type) {
        case 'ADD_GAME':
            return action.game;
        case 'ADD_PLAYER':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.playerNumber]: {
                        ...state.players[action.playerNumber],
                        userID: action.userID
                    }
                } 
            };
        case 'ADD_SECRET':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.playerNumber]: {
                        ...state.players[action.playerNumber],
                        secret: action.secret
                    }
                }
            };
        case 'ADD_GUESS':
            return {
                ...state,
                guesses: [
                    ...state.guesses,
                    { guess: action.guess, matches: action.matches }
                ]
            };
        default:
            return state;
    }
}