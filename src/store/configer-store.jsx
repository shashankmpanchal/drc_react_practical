import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { Reducer } from "./reducers/reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  store: Reducer,
});

export const configureStore = () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
};
