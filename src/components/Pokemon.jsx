import React from 'react';
import Card from 'react-bootstrap/Card'

function PokemonCard({pokemon,handleSelect, isSelected }) {
       return (
        <div className="card m-2" style={{width: "12rem", position:}}>
            <Card.Img
                  variant="top"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
        </div>
       )
} 