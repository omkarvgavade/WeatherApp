import React from "react";
import styled from "styled-components";
import {
  Condition,
  WeatherContainer,
  WeatherIcon,
} from "./WeatherInfo";
import SwitchTemperature from "./SwitchTemperature";

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

  const getDate = (timeStamp) => {
    const dateObj = new Date(timeStamp);
    const dayShort = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const monthShort = dateObj.toLocaleDateString("en-US", { month: "short" });
    const dateNumber = dateObj.getDate();
    const year = dateObj.getFullYear();
    const dayAndDate = `${dayShort}, ${monthShort} ${dateNumber}, ${year}`;
    return dayAndDate;
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
    </ForcastContStyled>
  );
}

export default ForcastCont;
