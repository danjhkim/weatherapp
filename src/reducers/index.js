import { combineReducers } from 'redux';

import getCityReducer from './getCityReducer'
import getWeather from './getWeather'

export default combineReducers({
    cities: getCityReducer,
    weathers: getWeather
    // this basically declares the variable names for the states after they are filtered.
});