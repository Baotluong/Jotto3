import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import gameReducer from '../reducers/game';
import guessReducer from '../reducers/guess';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      game: gameReducer,
      guess: guessReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
