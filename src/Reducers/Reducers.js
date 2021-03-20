import { combineReducers } from 'redux';
import CardsReducer from './CardsReducer.js';

export default combineReducers({
    cards: CardsReducer,
})