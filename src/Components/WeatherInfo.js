import React from "react";
import styled from "styled-components";
import sunset from "../assets/icons/temp.svg";
import sunrise from "../assets/icons/temp.svg";
import humidity from "../assets/icons/humidity.svg";
import wind from "../assets/icons/wind.svg";
import pressure from "../assets/icons/pressure.svg";
import WeatherDetailsComponent from "./WeatherDetailsComponent";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Switch from "react-switch";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  & span {
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
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

const ToggleTempTexture = styled.span`
  font-size: 10px !important;
`;

const WeatherInfo = ({ weather }) => {
  const isDay = weather?.weather[0].icon?.includes("d");
  const dispatch = useDispatch();
  const [temperature, setTemperature] = useState(false);
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  const toggleTemperatures = (e) => {
    setTemperature((prev) => !prev);
  };

  useEffect(() => {}, [temperature]);

  return (
    <>
      <WeatherContainer>
        <Condition>
          <span>
            {temperature
              ? `${Math.floor(weather?.main?.temp - 273) * 1.8 + 32}°F `
              : `${Math.floor(weather?.main?.temp - 273)}°C`}
            <ToggleTempTexture id="temp-switch">
              <Switch onChange={toggleTemperatures} checked={temperature} />
            </ToggleTempTexture>
          </span>
          {`  |  ${weather?.weather[0].description}`}
        </Condition>

        <WeatherIcon src={"http://openweathermap.org/img/w/" + weather?.weather[0].icon + ".png"} />
      </WeatherContainer>
      <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

      <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
      <WeatherInfoContainer>
        <WeatherDetailsComponent
          name={isDay ? "sunset" : "sunrise"}
          value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}
        />
        <WeatherDetailsComponent
          name={"humidity"}
          value={weather?.main?.humidity}
        />
        <WeatherDetailsComponent name={"wind"} value={weather?.wind?.speed} />
        <WeatherDetailsComponent
          name={"pressure"}
          value={weather?.main?.pressure}
        />
      </WeatherInfoContainer>
      <ReactTooltip
        anchorId="temp-switch"
        place="bottom"
        content="Switch to Fahrenheit"
      />
    </>
  );
};

export default WeatherInfo;
