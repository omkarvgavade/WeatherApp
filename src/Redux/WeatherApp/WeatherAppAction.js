import { asyncActionCreator,asyncActionTypeCreator } from "../ReduxUtils/ReduxActionHelper";

const getWeatherDataActionType = asyncActionTypeCreator('GET_WEATHER_DATA');
const getWeatherDataAction = asyncActionCreator(getWeatherDataActionType);

const getForcastActionType = asyncActionTypeCreator('GET_FORCAST');
const getForcastAction = asyncActionCreator(getForcastActionType);



const getWeatherData = (city)=>{
    const axiosConfig = {
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48f5ae62c8edd4eb24f90c633e17df79`,
        method: "GET"
      };
    return getWeatherDataAction.action(axiosConfig);
};

const getForcast = (city)=>{
    const axiosConfig = {
        url:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=48f5ae62c8edd4eb24f90c633e17df79`,
        method: "GET"
    }
    return getForcastAction.action(axiosConfig);
}



export {getForcastActionType,getWeatherData,getWeatherDataActionType,getForcast};