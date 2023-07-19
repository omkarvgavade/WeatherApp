import { asyncActionCreator,asyncActionTypeCreator } from "../ReduxUtils/ReduxActionHelper";

const getWeatherDataActionType = asyncActionTypeCreator('GET_WEATHER_DATA');
const getWeatherDataAction = asyncActionCreator(getWeatherDataActionType);

const getForcastActionType = asyncActionTypeCreator('GET_FORCAST');
const getForcastAction = asyncActionCreator(getForcastActionType);



const getWeatherData = (city)=>{
    const axiosConfig = {
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48f5ae62c8edd4eb24f90c633e17df79`,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          requireCreds: true,
        },
      };
    return getWeatherDataAction.action(axiosConfig);
};



export {getForcastActionType,getWeatherData,getWeatherDataActionType};