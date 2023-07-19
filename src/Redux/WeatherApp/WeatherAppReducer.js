import {
  getWeatherDataActionType,
  getForcastActionType,
} from "./WeatherAppAction";
import promiseState from "../ReduxUtils/ReduxReducerHelper";

const initState = {
  weatherData: {
    ...promiseState(false, false, false, {}),
  },
  forcastData: {
    ...promiseState(false, false, false, {}),
  },
};

export const weatherDataReducer = (state = initState, action) => {
  switch (action.type) {
    case getWeatherDataActionType.pending:
      return {
        weatherData: {
          ...promiseState(true, false, false, {}),
        },
      };
    case getWeatherDataActionType.fulfilled:
      return {
        weatherData: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case getWeatherDataActionType.rejected:
      return {
        weatherData: {
          ...promiseState(false, false, true, {}),
        },
      };
    case getForcastActionType.pending:
      return {
        forcastData: {
          ...promiseState(true, false, false, {}),
        },
      };
    case getForcastActionType.fulfilled:
      return {
        forcastData: {
          ...promiseState(false, true, false, action.payload),
        },
      };
    case getForcastActionType.rejected:
      return {
        forcastData: {
          ...promiseState(false, false, true, {}),
        },
      };
    default:
      return state;
  }
};
