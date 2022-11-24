import axios from 'axios';

const API_KEY = '6be02c3fd65486f472f61b1969380654';

const getWeatherByQuery = async query => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query.replace(' ', '+')}&appid=${API_KEY}&units=metric`);
};

export { getWeatherByQuery }