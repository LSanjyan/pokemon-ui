import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=151";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // Fetch list of Pokémon names (and URLs)
    fetch(PokeAPI)
      .then((response) => response.json())
      .then((data) => {
        // Fetch details for each Pokémon using the URLs in data.results
        const pokemonPromises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );

        // Wait until all Pokémon data is fetched and set the state
        Promise.all(pokemonPromises)
          .then((pokemonsData) => {
            setPokemons(pokemonsData); // Set the full data for each Pokémon
          });
      });
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-secondary">
        <Container>
          <Navbar.Brand className="text-light fw-bold">Pokeverse | </Navbar.Brand>
          <Navbar.Brand className="text-light text-start">All Pokemon</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          {/* Loop through the `pokemons` array and create a card for each one */}
          {pokemons.map((pokemon) => (
            <Col key={pokemon.id} md={4} className="mb-4">
              <Card>
                {/* Display Pokémon image */}
                <Card.Img
                  variant="top"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
                <Card.Body>
                  {/* Display Pokémon name */}
                  <Card.Title>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;

