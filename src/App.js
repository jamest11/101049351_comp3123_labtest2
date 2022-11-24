import {Container, Paper, Typography, Box, FormGroup, TextField, Button} from "@mui/material";
import WeatherConditions from "./WeatherConditions";
import {useState} from "react";
import './App.css';

const App = () => {
  const [query, setQuery] = useState();
  const [queryField, setQueryField] = useState();

  const handleChange = (event) => {
    setQueryField(event.target.value);
  };

  const handleSearch = () => {
    setQuery(queryField);
  };

  return (
    <Container component="main">
      <Box component={Paper} sx={{width: 'fit-content', mx: 'auto', my: 2, p: 4, borderRadius: 10}}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" my={2}>Toronto Weather Conditions</Typography>
          <WeatherConditions query={'Toronto'}/>
          <Typography variant="h4" my={2}>City Weather Search</Typography>
          <Box width="fit-content" minWidth={300} mb={2} borderRadius={5}>
            <FormGroup row sx={{gap: 2}}>
              <TextField onChange={handleChange} variant="outlined"></TextField>
              <Button variant="contained" sx={{alignSelf: 'center'}} onClick={handleSearch}> Search</Button>
            </FormGroup>
          </Box>
          {query && (
            <WeatherConditions query={query}/>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default App;
