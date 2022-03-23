import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetWeatherQuery } from "../api/weather.api";

import CircularProgress from "@mui/material/CircularProgress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

interface IWeatherProps {
  location: {
    lat: number;
    lon: number;
  };
}

const Weather: React.FC<IWeatherProps> = ({ location }) => {
  const { data, isLoading } = useGetWeatherQuery(location);

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

  return (
    <Box>
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        No weather data...
      </Typography>
    </Box>
  );
};

export default Weather;
