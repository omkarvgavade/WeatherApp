import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import City from "./Components/City";
import WeatherInfo from "./Components/WeatherInfo";
import { AiOutlineClose } from "react-icons/ai";

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
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=48f5ae62c8edd4eb24f90c633e17df79`
    );
    setWeather(response.data);
  };
  return (
    <Container>
      {city && weather ?<CloseButton onClick={()=>{
        setCity("");
        setWeather()
      }}>
        <AiOutlineClose />
      </CloseButton>:null}
      <AppLabel>Weather App</AppLabel>
      {city && weather ? (
        <WeatherInfo weather={weather} city={city} />
      ) : (
        <City setCity={setCity} fetchWeather={fetchWeather} />
      )}
    </Container>
  );
}

export default App;
