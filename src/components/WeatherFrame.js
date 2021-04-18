import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap'
import gsap, { TweenMax } from "gsap";

import { combinedWeather } from '../actions/'
import day from '../images/day.svg'
import night from '../images/night.svg'
import * as ALL from "../images/icons/";

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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitWeather = (e) => {
        e.preventDefault()
        const city = e.target.children[1].value
        const cityCapitalized = city[0].toUpperCase() + city.slice(1).toLowerCase().trim()
        if (weathers === null) {
            dispatch(combinedWeather(cityCapitalized)).catch(err => {
                if (err.message === "Failed to fetch") {
                    console.log('fetch has failed')
                } else {
                    console.log('Could not retrieve information');
                }
                handleShow()
            })
            setCity(cityCapitalized)
            e.target.children[1].value = ""
        } else if (weathers[cityCapitalized] === undefined) {
            dispatch(combinedWeather(cityCapitalized)).catch(err => {
                if (err.message === "Failed to fetch") {
                    console.log('fetch has failed')
                } else {
                    console.log('Could not retrieve information');
                }
                handleShow()
            })
            setCity(cityCapitalized)
            e.target.children[1].value = ""
        } else {
            setCity(cityCapitalized)
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
            TweenMax.to(circleIcon.current, 1.5, { rotation: 360, repeat: 1, ease: "Linear.easeNone", delay: 0.8 })
            TweenMax.fromTo(mainBox.current, 0.6, { y: 80, opacity: 0 }, { y: 0, opacity: 1 })

            TweenMax.fromTo(littleBox.current, 0.6, { y: 80, opacity: 0 }, { y: 0, delay: 1.5, opacity: 1, ease: "Back.easeOut" })
        }
    }, [renderWeather])

    return (
        <>
            <Button variant="primary" onClick={handleShow} hidden></Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                </Modal.Footer>
            </Modal>

            <div className="main">
                <div className="container my-5">
                    <h1 className="text-muted text-center my-4">Weather App</h1>

                    <form className="change-location my-4 text-center text-muted" onSubmit={(e) => {
                        e.stopPropagation()
                        submitWeather(e)
                    }}>
                        <label htmlFor="city" className="smol">Enter a location</label>
                        <input type="input" name="city" className="form-control p-4 searchbar" placeholder="Enter a City" autoComplete="off" />
                    </form>
                    {renderWeather()}
                </div>
            </div>
        </>

    );
}

export default WeatherFrame;