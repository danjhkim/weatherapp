import { weatherAPI, key } from '../apis';

//get city information

export const getCity = city => async (dispatch, getState) => {
	const query = `?apikey=${key}&q=${city}`;
	const response = await weatherAPI.get('locations/v1/cities/search' + query);
	if (response.status === 503) {
		throw new Error('Max tries reached');
	} else if (response.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	console.log(response);
	const data = response.data;

	dispatch({ type: 'FETCH_CITY', payload: data[0] });
};
//get weather information
export const getWeather = id => async (dispatch, getState) => {
	const query = `${id.Key}?apikey=${key}`;
	const response = await weatherAPI.get('currentconditions/v1/' + query);
	if (response.status === 503) {
		throw new Error('Max tries reached');
	} else if (response.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	console.log(response);
	const data = { ...response.data[0], city: id.LocalizedName };

	dispatch({ type: 'FETCH_WEATHER', payload: data });
};

//combined weather and city
export const combinedWeather = city => async (dispatch, getState) => {
	try {
		await dispatch(getCity(city));
		await dispatch(getWeather(getState().cities[city]));
	} catch (err) {
		if (err.message === 'Failed to fetch') {
			console.log('fetch has failed');
		} else if (err.message === 'Max tries reached') {
			console.log('Max tries reached');
		} else {
			console.log('Could not retrieve information');
		}
	}
};

export const turnOn = () => {
	return {
		type: 'SWITCH_ON',
	};
};

export const turnOff = () => {
	return {
		type: 'SWITCH_OFF',
	};
};
