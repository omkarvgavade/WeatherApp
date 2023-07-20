import React from "react";
import styled from "styled-components";
import sunset from "../assets/icons/temp.svg";
import sunrise from "../assets/icons/temp.svg";
import humidity from "../assets/icons/humidity.svg";
import wind from "../assets/icons/wind.svg";
import pressure from "../assets/icons/pressure.svg";
import WeatherDetailsComponent from "./WeatherDetailsComponent";
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import SwitchTemperature from "./SwitchTemperature";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Loader from "../Common/Loader";

export const WeatherInfoIcons = {
  sunset: sunset,
  sunrise: sunrise,
  humidity: humidity,
  wind: wind,
  pressure: pressure,
};
const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;
export const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  & span {
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

export const WeatherInfoLabel = styled.p`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;
export const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
export const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

export const ToggleTempTexture = styled.span`
  font-size: 10px !important;
`;

export const ResultNotFound = styled.div`
  width: 100%;
  min-height: 15rem !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  color: gray !important;
`;
export const MaxMinTextStyled = styled.span`
  display: inline-block;
  padding: 6px;
  background-color: #43c6ac;
  color: #ffffff;
  border-radius: 12px;
  font-size: 14px !important;
  font-weight: bold;
`;
export const WeatherInfo = () => {
  const { data, isPending, isError } =
    useSelector(({ weather }) => weather.weatherData, shallowEqual) || {};
  const [temperature, setTemperature] = useState(false);
  const [weather, setWeather] = useState();
  const [isDay, setIsDay] = useState(false);
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  const toggleTemperatures = (e) => {
    setTemperature((prev) => !prev);
  };
  useEffect(() => {
    setWeather(data);
    if (data && Object.keys(data).length > 0) {
      setIsDay(data?.weather[0].icon?.includes("d"));
    }
  }, [data]);

  return (
    <>
      {isPending ? (
        <ResultNotFound>
          <Loader />
        </ResultNotFound>
      ) : weather && Object.keys(weather).length > 0 ? (
        <>
          <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
          <WeatherContainer>
            <Condition>
              <SwitchTemperature
                maxTemp={weather?.main?.temp || 0}
                index={18}
              />
              {`  |  ${weather?.weather[0].description}`}
            </Condition>
            <WeatherIcon
              src={
                "http://openweathermap.org/img/w/" +
                weather?.weather[0].icon +
                ".png"
              }
            />
          </WeatherContainer>
          <Condition>
            <span>
              {" "}
              <MaxMinTextStyled>Max-Temp :</MaxMinTextStyled>
              <SwitchTemperature
                maxTemp={weather?.main?.temp_max || 0}
                index={16}
              />
            </span>
            |
            <span>
              <MaxMinTextStyled>Min-Temp :</MaxMinTextStyled>
              <SwitchTemperature
                maxTemp={weather?.main?.temp_min || 0}
                index={17}
              />
            </span>
          </Condition>
          <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
          <WeatherInfoContainer>
            <WeatherDetailsComponent
              name={isDay ? "sunset" : "sunrise"}
              value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
            />
            <WeatherDetailsComponent
              name={"humidity"}
              value={weather?.main?.humidity + " %"}
            />
            <WeatherDetailsComponent
              name={"wind"}
              value={weather?.wind?.speed + " m/s"}
            />
            <WeatherDetailsComponent
              name={"pressure"}
              value={weather?.main?.pressure + " hPa"}
            />
          </WeatherInfoContainer>{" "}
          <ReactTooltip
            anchorId="temp-switch"
            place="bottom"
            content={
              !temperature ? "Switch to Fahrenheit" : "Switch to Celsius"
            }
          />
        </>
      ) : (
        <ResultNotFound>
          <h3>Not found</h3>
        </ResultNotFound>
      )}
    </>
  );
};
