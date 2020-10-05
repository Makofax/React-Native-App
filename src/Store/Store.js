import { createStore, applyMiddleware } from 'redux';
import { mainReducer } from "./Reducers";
import thunkMiddleware from "redux-thunk";
import { create } from 'react-test-renderer';

export const store = createStore(mainReducer, applyMiddleware(thunkMiddleware));