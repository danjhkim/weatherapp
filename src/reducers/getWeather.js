const getWeather = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_WEATHER':
            return { ...state, [action.payload.city]: action.payload }
        default:
            return state;
    }
}

export default getWeather