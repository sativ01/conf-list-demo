import * as React from "react";
import { byName } from "country-finder";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetWeatherQuery } from "../api/weather.api";

import CircularProgress from "@mui/material/CircularProgress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

interface IWeatherProps {
  isVisible: boolean;
  countryName: string;
}

const Weather: React.FC<IWeatherProps> = ({ isVisible, countryName }) => {
  const countryData = byName(countryName);
  const { data, error, isLoading } = useGetWeatherQuery({
    lat: countryData?.lat,
    lon: countryData?.long
  });
  console.log(error);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (data) {
    return (
      <Box>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <DeviceThermostatIcon />
          {`${data?.properties?.timeseries?.[0].data?.instant?.details?.air_temperature} `}
          &#x2103;
        </Typography>
      </Box>
    );
  }

  return null;
};

export default Weather;
