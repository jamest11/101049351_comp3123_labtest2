import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const getWeatherByQuery = async query => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query.replace(' ', '+')}&appid=${API_KEY}&units=metric`);
};

export { getWeatherByQuery };