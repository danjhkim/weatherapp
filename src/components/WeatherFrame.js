import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
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

    const submitWeather = (e) => {
        e.preventDefault()
        const city = e.target.children[1].value
        const cityCapitalized = city[0].toUpperCase() + city.slice(1).toLowerCase().trim()
        if (weathers === null) {
            dispatch(combinedWeather(cityCapitalized))
            setCity(cityCapitalized)
            e.target.children[1].value = ""
        } else if (weathers[cityCapitalized] === undefined) {
            dispatch(combinedWeather(cityCapitalized))
            setCity(cityCapitalized)
            e.target.children[1].value = ""
        } else {
            setCity(cityCapitalized)
            e.target.children[1].value = ""
        }
    };

    useEffect(() => {
        TweenMax.to(circleIcon.current, 2, { rotation: 360, repeat: 1 })
    }, [city])

    const renderWeather = () => {
        if (weathers === null || weathers[city] === undefined) {
            return
        } else {
            return (
                <div className={`card shadow-lg rounded}`}>
                    <div className="icon bg-light mx-auto text-center">
                        <img ref={circleIcon} alt="placeholder" src={ALL[`file${weathers[city].WeatherIcon}`].default}></img>
                    </div>
                    <div className="totalshadow" style={{ background: weathers[city].IsDayTime ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.5)' }}></div>
                    <img alt="weather" className="time card-img-top" src={weathers[city].IsDayTime ? `${day}` : `${night}`}></img>
                    <div className="text-uppercase details" style={{ color: weathers[city].IsDayTime ? 'black' : 'white' }}>
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


    return (
        <div className="main">
            <button type="button" className="btn btn-primary maxTry" data-bs-toggle="modal" data-bs-target="#notries" hidden>
            </button>
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

    );
}

export default WeatherFrame;