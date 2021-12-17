import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

var middleware = [thunk];

var store = createStore(rootReducer, composeWithDevTools(applyMiddleware.apply(undefined, middleware)));

export default store;