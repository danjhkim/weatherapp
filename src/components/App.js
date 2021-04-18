import React from 'react'

import WeatherFrame from './WeatherFrame'
import Modal from './Modal'

class App extends React.Component {

    render() {
        return (
            <>
                <WeatherFrame />
                <Modal />
            </>
        )
    }

}

export default App