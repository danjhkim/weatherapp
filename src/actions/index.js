import { weatherAPI, key } from '../apis'

//get city information

export const getCity = (city) => async dispatch => {
    const query = `?apikey=${key}&q=${city}`;
    const response = await weatherAPI.get('locations/v1/cities/search' + query);
    if (response.status !== 200) {
        throw new Error('Error, fetching the data');
    }
    const data = response.data;

    dispatch({ type: 'FETCH_CITY', payload: data[0] });
}

//get weather information
export const getWeather = (id) => async (dispatch) => {
    const query = `${id.Key}?apikey=${key}`;
    const response = await weatherAPI.get('currentconditions/v1/' + query);
    if (response.status !== 200) {
        throw new Error('Error, fetching the data');
    }
    const data = { ...response.data[0], city: id.LocalizedName }

    dispatch({ type: 'FETCH_WEATHER', payload: data });
}

//combined weather and city 
export const combinedWeather = (city) => async (dispatch, getState) => {
    await dispatch(getCity(city));
    await dispatch(getWeather(getState().cities[city]));
}