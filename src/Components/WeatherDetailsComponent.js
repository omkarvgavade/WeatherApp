import React from "react";
import { WeatherInfoIcons } from "./WeatherInfo";
import styled from "styled-components";

const WeatherDetailsComponent = ({ name, value }) => {
  const InfoContainer = styled.div`
    display: flex;
    margin: 5px 10px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  `;
  const InfoIcon = styled.img`
    width: 36px;
    height: 36px;
  `;
  const InfoLabel = styled.span`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin: 15px;
    & span {
      font-size: 12px;
      text-transform: capitalize;
    }
  `;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};

export default WeatherDetailsComponent;