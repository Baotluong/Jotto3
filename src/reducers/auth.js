const defaultErrorState = {
  error: '',
};

export default (state = defaultErrorState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid
      };
    case 'LOGOUT':
      return {
        ...state,
        uid: ''
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
};
