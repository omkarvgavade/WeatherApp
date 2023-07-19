import React, { useState } from "react";
import styled from "styled-components";
import City from "./Components/City";
import { WeatherInfo } from "./Components/WeatherInfo";
import { useDispatch } from "react-redux";
import { getWeatherData } from "./Redux/WeatherApp/WeatherAppAction";
import { getForcast } from "./Redux/WeatherApp/WeatherAppAction";
import Forcast from "./Components/Forcast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleInputError } from "./Utils/HelperFunctions";


const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: #fff;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(#000428,#004e92);
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppLabel = styled.h1`
  margin: 20px auto;
  font-weight: bold;
  font-family:'Pacifico', cursive;
`;

function App() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [isReset, setIsReset] = useState(true);
  const fetchWeather = (e) => {
    e.preventDefault();
    if (!city) {
      handleInputError("Please enter a city name.");
      return;
    }
    dispatch(getWeatherData(city));
    dispatch(getForcast(city));
    setIsReset(false);
  };

  return (
    <MainContainer>
      <Container>
        <AppLabel>Weather App</AppLabel>
        <City
          setCity={setCity}
          city={city}
          fetchWeather={fetchWeather}
          setIsReset={setIsReset}
        />
        {!isReset ? (
          <>
            <WeatherInfo />
            <Forcast />
          </>
        ) : null}
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </MainContainer>
  );
}

export default App;
