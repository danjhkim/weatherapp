import axios from 'axios';

export const weatherAPI = axios.create({
    baseURL: 'http://dataservice.accuweather.com/'
});

export const key = 'ZWvN9bnUBaubBdTbMtKYECwOVxj3FPtt'