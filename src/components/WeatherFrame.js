import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap'
import gsap, { TweenMax } from "gsap";

import { combinedWeather, turnOff, turnOn } from '../actions/'
import day from '../images/day.svg'
import night from '../images/night.svg'
import * as ALL from "../images/icons/"
import logo from '../images/logo.png'

gsap.config({
    autoSleep: 60,
    force3D: false,
    nullTargetWarn: false,
    units: { left: "%", top: "%", rotation: "rad" }
});

const WeatherFrame = () => {
    const dispatch = useDispatch();
    const weathers = useSelector(state => state.weathers);
    const [city, setCity] = useState(null)
    const circleIcon = useRef()
    const mainBox = useRef()
    const littleBox = useRef()

    const showModal = useSelector(state => state.getSwitch)


    const submitWeather = (e) => {
        e.preventDefault()
        const city = e.target.children[1].value
        // const cityCapitalized = city[0].toUpperCase() + city.slice(1).toLowerCase().trim()
        if (weathers === null || weathers[city] === undefined) {
            dispatch(combinedWeather(city)).then(() => {
                setCity(city)
                e.target.children[1].value = ""
            }).catch(err => {
                dispatch(turnOn())
            })
        } else {
            setCity(city)
            e.target.children[1].value = ""
        }
    };

    const renderWeather = () => {
        if (weathers === null || weathers[city] === undefined) {
            return
        } else {
            return (
                <div className={`card shadow-lg rounded}`} ref={mainBox}>
                    <div className="icon bg-light mx-auto text-center">
                        <img ref={circleIcon} alt="placeholder" src={ALL[`file${weathers[city].WeatherIcon}`].default}></img>
                    </div>
                    <div className="totalshadow" style={{ background: weathers[city].IsDayTime ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.5)' }}></div>
                    <img alt="weather" className="time card-img-top" src={weathers[city].IsDayTime ? `${day}` : `${night}`}></img>
                    <div className="text-uppercase details" style={{ color: weathers[city].IsDayTime ? 'black' : 'white' }} ref={littleBox}>
                        <h5 className="my-3">{weathers[city].city}</h5>
                        <div className="my-3 smol">{weathers[city].WeatherText}</div>
                        <div className="display-4 my-4">
                            <span>{weathers[city].Temperature.Metric.Value}</span>
                            <span>&deg;C</span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        if (weathers === null || weathers[city] === undefined) {
            return
        } else {
            TweenMax.fromTo(mainBox.current, 0.6, { y: 80, opacity: 0 }, { y: 0, opacity: 1 })

            TweenMax.fromTo(littleBox.current, 0.6, { y: 80, opacity: 0 }, { y: 0, delay: .5, opacity: 1, ease: "Back.easeOut" })
        }
        // eslint-disable-next-line
    }, [renderWeather])

    return (
        <>
            <Button variant="primary" onClick={() => dispatch(turnOn())} hidden ></Button>
            <Modal show={showModal.show} onHide={() => dispatch(turnOff())}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body> Sorry, we've reach the maximum number of retrievals for today (50 max). Please come try again
                    tomorrow!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(turnOff())}>
                        Close
                        </Button>
                </Modal.Footer>
            </Modal>

            <div className="main">
                <div className="container my-5" onSubmit={(e) => e.stopPropagation()}>
                    <h1 className="text-muted text-center my-4">Weather App</h1>

                    <form className="change-location my-4 text-center text-muted" onSubmit={(e) => {
                        submitWeather(e)
                    }}>
                        <label htmlFor="city" className="smol">Enter a location</label>
                        <input type="input" name="city" className="form-control p-4 searchbar" placeholder="Enter a City" autoComplete="off" />
                    </form>
                    {renderWeather()}
                </div>
                <div className="d-flex align-items-end" style={{ height: "55vh" }}>
                    <img src={logo} alt="acuweather" width="150px" />
                </div>
            </div>
        </>

    );
}

export default WeatherFrame;