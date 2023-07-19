import React, { useState ,useEffect} from "react";
import styled from "styled-components";
import Axios from "axios";
import City from "./Components/City";
import WeatherInfo from "./Components/WeatherInfo";
import { AiOutlineClose } from "react-icons/ai";
import {useDispatch,useSelector,shallowEqual} from 'react-redux';
import { getWeatherData } from "./Redux/WeatherApp/WeatherAppAction";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  background: linear-gradient(#bdc3c7, #2c3e50);
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  font-family: Montserrat;
`;

const AppLabel = styled.h2`
  color: black;
  margin: 20px auto;
  font-weight: bold;
`;
const CloseButton = styled.div`
    padding: 3px;
    left: 45%;
    background-color: black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
    cursor: pointer;
`;

function App() {
  const dispatch = useDispatch();
  const { data ,isPending,isError} =
  useSelector(({ weather }) => weather.weatherData, shallowEqual) ||
  {};


  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    dispatch(getWeatherData(city))
  };

  useEffect(()=>{
    setWeather(data)
  },[data])
  return (
    <Container>
      {city && weather && Object.keys(weather).length > 0 ? <CloseButton onClick={()=>{
        setCity("");
        setWeather()
      }}>
        <AiOutlineClose />
      </CloseButton>:null}
      <AppLabel>Weather App</AppLabel>
      {city && weather && Object.keys(weather).length > 0 ? (
        <WeatherInfo weather={weather} city={city} />
      ) : (
        <City setCity={setCity} fetchWeather={fetchWeather} />
      )}
    </Container>
  );
}

export default App;
