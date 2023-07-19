import React ,{useState} from 'react'
import styled from 'styled-components';
import Switch from "react-switch";

export const ToggleTempTexture = styled.span`
  font-size: 10px !important;
`;

function SwitchTemperature({maxTemp,index=15}) {
  const [temperature, setTemperature] = useState(false);

  const toggleTemperatures = (e) => {
    setTemperature((prev) => !prev);
  };

  return (
    <span>
    {temperature
      ? `${Math.floor((maxTemp - 273) * 1.8 + 32)}°F `
      : `${Math.floor(maxTemp - 273)}°C`}
    <ToggleTempTexture id={`temp-switch-${index + 1}`}>
      <Switch onChange={toggleTemperatures} checked={temperature} />
    </ToggleTempTexture>
  </span>
  )
}

export default SwitchTemperature