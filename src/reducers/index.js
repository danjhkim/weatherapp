import { combineReducers } from 'redux';

import getCityReducer from './getCityReducer'
import getWeather from './getWeather'
import getSwitch from './getSwitch'

export default combineReducers({
    cities: getCityReducer,
    weathers: getWeather,
    getSwitch: getSwitch
    // this basically declares the variable names for the states after they are filtered.
});