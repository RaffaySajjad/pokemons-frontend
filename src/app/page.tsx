"use client";

import PokemonList from "@/components/PokemonList";
import apiClient from "@/utils/apiClient";

export default function Home() {
  const fetchPokemons = async (offset = 0, limit = 3) => {
    try {
      const response = await apiClient.get("pokemons/all", {
        params: { offset, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    }
  };

  const logPokemons = async () => {
    const pokemons = await fetchPokemons();
    console.log("Pokemons:", pokemons);
  };

  logPokemons();

  return (
    <main>
      <PokemonList />
    </main>
  );
}
