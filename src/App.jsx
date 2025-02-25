import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const PokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=151";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [squad, setSquad] = useState([]);
       
  const handleSelect = (pokemon) => {
    if (squad.some((p) => p.id === pokemon.id)) {
      setSquad(squad.filter((p) => p.id !== pokemon.id)) 
      } else if (squad.length < 6) {
         setSquad([...squad, pokemon])
      } else {
        alert("You can only select up to Pokemon!")
      }
    }
    
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
      <div>
        <h1>Pokemons</h1>
      </div>
       <Nav/>
      <Container className="mt-4">
        <Row>
          {/* Loop through the `pokemons` array and create a card for each one */}
          {pokemons.map((pokemon) => (
            <Col key={pokemon.id} md={4} className="mb-4">
              <Card>
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
                  <Button
                  variant={squad.some((p) => p.id === pokemon.id) ? "danger" : "success"}
                  onClick={() => handleSelect(pokemon)}
                  style={{ position: "absolute", bottom: "20px", right: "30px"}}>
                    {squad.some((p) => p.id === pokemon.id) ? "Remove" : "Add"}
                  </Button>
                </Card.Body>
                 </Card>
            </Col>
          ))}
        </Row>

        {/* Battle Button*/}
        <div className="text-center mt-4">
          <Button variant="primary" disabled={squad.length < 2}>
            Battle!
          </Button>
        </div>
      </Container>
    </>
  );
}

export default App;

