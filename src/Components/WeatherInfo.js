import React from "react";
import styled from "styled-components";
import { WeatherIcons } from "../Utils/WeatherIcons";
import sunset from '../assets/icons/temp.svg';
import sunrise from '../assets/icons/temp.svg';
import humidity from '../assets/icons/humidity.svg';
import wind from '../assets/icons/wind.svg';
import pressure from '../assets/icons/pressure.svg';
import WeatherDetailsComponent from "./WeatherDetailsComponent";

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
const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
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



const WeatherInfo = ({weather}) => {
    const isDay = weather?.weather[0].icon?.includes('d')
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }
    return (
        <>
            <WeatherContainer>
                <Condition>
                    <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
                    {`  |  ${weather?.weather[0].description}`}
                </Condition>
                <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]}/>
            </WeatherContainer>
            <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

            <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherDetailsComponent name={isDay ? "sunset" : "sunrise"}
                                      value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}/>
                <WeatherDetailsComponent name={"humidity"} value={weather?.main?.humidity}/>
                <WeatherDetailsComponent name={"wind"} value={weather?.wind?.speed}/>
                <WeatherDetailsComponent name={"pressure"} value={weather?.main?.pressure}/>
            </WeatherInfoContainer>
        </>
    );
};

export default WeatherInfo;