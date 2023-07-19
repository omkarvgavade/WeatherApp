import React from "react";
import styled from "styled-components";
import {
  Condition,
  WeatherContainer,
  WeatherIcon,
} from "./WeatherInfo";
import Switch from "react-switch";
import { useState } from "react";
import SwitchTemperature from "./SwitchTemperature";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ForcastContStyled = styled.div`
  width: 100%;
  & .condition {
    flex-direction: column;
    & span {
      flex-direction: column;
    }
  }
`;

const DateStyled = styled.p`
  font-size: 16px;
  display: flex;
  margin-left: 10px;
  justify-content: center;
`;

function ForcastCont({ weather, index }) {
  const [temperature, setTemperature] = useState(false);

  const getDate = (timeStamp) => {
    const dateObj = new Date(timeStamp);
    const dayShort = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const monthShort = dateObj.toLocaleDateString("en-US", { month: "short" });
    const dateNumber = dateObj.getDate();
    const year = dateObj.getFullYear();
    const dayAndDate = `${dayShort}, ${monthShort} ${dateNumber}, ${year}`;
    return dayAndDate;
  };

  const toggleTemperatures = (e) => {
    setTemperature((prev) => !prev);
  };

  return (
    <ForcastContStyled>
      {" "}
      <DateStyled>{getDate(weather.date)}</DateStyled>
      <WeatherContainer className="condition">
        <WeatherIcon
          src={"http://openweathermap.org/img/w/" + weather.icon + ".png"}
        />
        <Condition>
          {`  ${weather.description}`}
          <SwitchTemperature maxTemp={weather?.maxTemp || 0} index={index}/>
        </Condition>
      </WeatherContainer>
      <ReactTooltip
        anchorId={`temp-switch-${index + 1}`}
        place="bottom"
        content={!temperature ? "Switch to Fahrenheit":"Switch to Celsius"}
      />
    </ForcastContStyled>
  );
}

export default ForcastCont;
