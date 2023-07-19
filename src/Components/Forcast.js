import React from "react";
import styled from "styled-components";
import WeatherInfo from "./WeatherInfo";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useState, useEffect } from "react";
import ForcastCont from "./ForcastCont";
import { WeatherInfoLabel } from "./WeatherInfo";
import { ResultNotFound } from "./WeatherInfo";
import Loader from "../Common/Loader";
const ForcastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    display: grid;
    color:black ;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 90%;
    grid-gap: 2rem;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
  }
  @media (max-width: 800px) {
    & > div {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const ForcastMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: linear-gradient(#ece9e6,#ffffff);
  margin: auto;
  border-radius: 30px;
  box-shadow: 0 3px 6px 0 #555;
  font-family: Montserrat;
`;

function Forcast() {
  const { data ,isPending,isError} =
    useSelector(({ weather }) => weather.forcastData, shallowEqual) || {};
  const [forcastArray, setForcastArray] = useState([]);

  // Finds max temperature in the day
  const findMax = (weatherList, start) => {
    let max = 0;
    for (let i = start; i < start + 8; i++) {
      max = Math.max(max, weatherList[i].main.feels_like);
    }
    return max;
  };

  // Finds min temperature in the day
  const findMin = (weatherList, start) => {
    let min = 0;
    for (let i = start; i < start + 8; i++) {
      min = Math.min(min, weatherList[i].main.feels_like);
    }
    return min;
  };

  const getSelectedData = (list) => {
    const days = [];
    for (let i = 0; i < list.length; i += 8) {
      var temp = {};
      temp.date = new Date(list[i + 5].dt_txt);
      const maxTemp = findMax(list, i);
      temp.maxTemp = maxTemp;
      temp.main = list[i].weather[0].main;
      temp.description = list[i + 3].weather[0].description;
      temp.icon = list[i].weather[0].icon;
      days.push(temp);
    }

    return days;
  };
  useEffect(() => {
      setForcastArray(getSelectedData(data?.list || []));
  }, [data]);
  return (
    <ForcastContainer>
      <WeatherInfoLabel>Forecast (5 days)</WeatherInfoLabel>
      {isPending ? <ResultNotFound><Loader/></ResultNotFound>: forcastArray && forcastArray.length > 0 ? <div>
        {forcastArray.map((weather, index) => {
          return (
            <ForcastMainContainer key={uuidv4()}>
              {" "}
              <ForcastCont  weather={weather} index={index} />
            </ForcastMainContainer>
          );
        })}
      </div>: <ResultNotFound><h3>Not Found</h3></ResultNotFound>}
    </ForcastContainer>
  );
}

export default Forcast;
