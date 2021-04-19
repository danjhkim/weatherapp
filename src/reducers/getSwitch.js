const getSwitch = (state = { show: false }, action) => {
    switch (action.type) {
        case 'SWITCH_ON':
            return { ...state, show: true }
        case 'SWITCH_OFF':
            return { ...state, show: false }
        default:
            return state;
    }
}

export default getSwitch