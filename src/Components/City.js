import styled from "styled-components";
import React from "react";

const SearchBox = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  border-radius: 2px;
  gap:1rem ;
  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: Montserrat;
    font-weight: bold;
  }
  & button {
    background-color:green;
    font-size: 14px;
    padding: 0 10px;
    color: #fff;
    border: none;
    border-radius:5px;
    outline: none;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: bold;
  }
`;
const ChooseCityLabel = styled.span`
  margin: 10px auto;
  font-size: 18px;
  font-weight: bold;
  color:gray;
`;
const City = ({ setCity,city, fetchWeather ,setIsReset} ) => {
  return (
    <>
      <ChooseCityLabel>Find Weather using city name</ChooseCityLabel>
      <SearchBox>
        <input
          onChange={(e) => setCity(e.target.value)}
          placeholder="enter city name"
          value={city}
        />
        <button onClick={fetchWeather}>Search</button>
        <button onClick={()=>{
            setCity("");
            setIsReset(true);
        }}>Reset</button>
      </SearchBox>
    </>
  );
};
export default City;