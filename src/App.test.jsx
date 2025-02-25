import React from 'react';
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from './App';

// Mock the fetch API to simulate fetching Pokémon data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      }),
  })
);

test("renders App and fetches Pokémon data", async () => {
  render(<App />);

  // Check that the fetch API was called
  expect(fetch).toHaveBeenCalledTimes(1);

  // Wait for the Pokémon names to be rendered
  await waitFor(() => {
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });
});
