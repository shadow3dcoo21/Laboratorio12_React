
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


const customTheme = createTheme();

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); 
  const [results, setResults] = useState([]); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
        setResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchData();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const loadAllCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://swapi.dev/api/people/');
      setResults(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Personajes de Star Wars</h1>
          <Box
            sx={{
              display: 'grid',
              
              gap: 2,
            }}
          >
            <ThemeProvider theme={customTheme}>
              <TextField
                label="Buscar Personajes"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: '90%', margin: 'auto' }}
              />
            </ThemeProvider>
          </Box>
         
          <Button
              variant="primary"
              onClick={loadAllCharacters}
              disabled={loading}
              style={{ width: '90%', padding: '5px', marginTop: '10px' }}
            >
              {loading ? 'Loading...' : 'CARGAR PERSONAJES'}
          </Button>
        </Col>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {results.map((character) => (
            <Card key={character.name} border="secondary" style={{ width: '300px', margin: '10px' }}>
              <Card.Body>
                <Card.Title className="text-primary">{character.name}</Card.Title>
                <Card.Text>
                  <strong>Género:</strong> {character.gender}<br />
                  <strong>Año de nacimiento:</strong> {character.birth_year}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default SearchForm;
