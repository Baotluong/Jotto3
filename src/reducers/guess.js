export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_GUESS':
            return [
                ...state,
                action.guess
            ];
        default:
            return state;
    }
}