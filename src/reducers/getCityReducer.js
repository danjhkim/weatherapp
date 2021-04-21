const getCityReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_CITY':
            return { ...state, [action.payload.LocalizedName]: action.payload }
        default:
            return state;
    }
}

export default getCityReducer

