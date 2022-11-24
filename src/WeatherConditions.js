import {Paper, Box, Avatar, Typography, Alert, AlertTitle, LinearProgress, Button} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {getWeatherByQuery} from "./api";

const WeatherConditions = ({ query }) => {
  const [conditions, setConditions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [date, setDate] = useState({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    const res = await getWeatherByQuery(query);
    setConditions(res.data);
    setDate(new Date(res.data.dt * 1000));
  }, [query]);

  const uppercaseFirst = (str) => {
    return str[0].toUpperCase() + str.substring(1);
  };

  useEffect(() => {
    fetchData()
      .catch(err => setError(true))
      .finally(() => setLoading(false));

  }, [fetchData]);

  const handleRefresh = () => {
    fetchData()
      .catch(err => setError(true))
      .finally(() => setLoading(false));
  };

  return (
    <Box
      component={Paper}
      sx={{ borderRadius: 10, display: 'flex', width: 'fit-content', minWidth: 500, minHeight: 200, backgroundColor: '#f7f7f7' }}
    >
      {loading ? (
        <Box sx={{ alignSelf: 'center', width: 1, px: 2 }}>
          <LinearProgress />
        </Box>
      ) : error ? (
        <Box sx={{ alignSelf: 'center', mx: 'auto'}}>
          <Alert severity="error" sx={{ borderRadius:5 }}
            action={
              <Button size="small" color="inherit" onClick={handleRefresh}>Refresh</Button>
            }>
            <AlertTitle>Error</AlertTitle>
            Unable to fetch forecast for location <strong>{query}</strong>
          </Alert>
        </Box>
      ) : (
        <>
          <Box
            component={Paper}
            sx={{
              display: 'flex', flexDirection: 'column', align: 'flex-start', overflowWrap: 'anywhere',
              width: 'fit-content', minWidth: 160,  minHeight: 200, maxWidth: 200,
              py: 2, px: 3, backgroundColor: '#cfd8dc', borderRadius: 10
            }}
          >
            {conditions && (
              <>
                <Typography variant="h6">{conditions.name}</Typography>
                <Typography>{date.toLocaleDateString([], { month: 'long', day: 'numeric' }) }</Typography>
                <Avatar
                  src={`http://openweathermap.org/img/wn/${conditions.weather[0].icon}@2x.png`}
                  sx={{ width: 72, height: 72 }}
                />
                <Typography variant="h4">{conditions.main.temp.toFixed(0)}°C</Typography>
                <Typography>{uppercaseFirst(conditions.weather[0].description)}</Typography>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', width: 1, padding: 2, flexDirection: 'column' }}>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'row', width: 1}}>
              <Box component="div" align="left" flex={1}>
                <Typography fontWeight="bold" my={1}>Feels Like</Typography>
                <Typography fontWeight="bold" my={1}>Max Temp</Typography>
                <Typography fontWeight="bold" my={1}>Min Temp</Typography>
                <Typography fontWeight="bold" my={1}>Wind Speed</Typography>
                <Typography fontWeight="bold" my={1}>Humidity</Typography>
                <Typography fontWeight="bold" my={1}>Last Update</Typography>
              </Box>
              <Box component="div" align="right" flex={1}>
                <Typography my={1}>{conditions.main.feels_like.toFixed(0)}°C</Typography>
                <Typography my={1}>{conditions.main.temp_max.toFixed(0)}°C</Typography>
                <Typography my={1}>{conditions.main.temp_min.toFixed(0)}°C</Typography>
                <Typography my={1}>{conditions.wind.speed.toFixed(0)} km/h</Typography>
                <Typography my={1}>{conditions.main.humidity}%</Typography>
                <Typography>{date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}</Typography>
              </Box>
            </Box>
            <Box component="div" display="flex" justifyContent="right" width={1}>
              <Button variant="text" size="small" onClick={handleRefresh}>Refresh</Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );  
};

export default WeatherConditions;