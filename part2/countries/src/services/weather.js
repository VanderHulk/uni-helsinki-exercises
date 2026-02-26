import.meta.env
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

export const getWeather = (lat, lon) => {
   
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}