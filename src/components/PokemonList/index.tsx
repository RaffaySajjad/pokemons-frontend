import apiClient from "@/utils/apiClient";
import { Pokemon } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import PokemonCard from "../PokemonCard";
import {
  Button,
  Container,
  Row,
  SearchInput,
  ErrorText,
  LoadingText,
  RaritySelect,
} from "./styles";
import { Rarity } from "@/utils/constants";

const fetchPokemons = async (offset: number, limit: number) => {
  const response = await apiClient.get("pokemons/all", {
    params: { offset, limit },
  });
  return response.data;
};

const searchPokemons = async (searchText: string) => {
  const response = await apiClient.get("pokemons", {
    params: { name: searchText },
  });
  return response.data;
};

const fetchPokemonsByRarity = async (rarity: Rarity) => {
  const response = await apiClient.get("pokemons", {
    params: { rarity },
  });
  return response.data;
};

const PokemonList: React.FC = () => {
  const limit = 3;
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<Rarity | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: pokemons,
    isError,
    error,
    isFetching,
  } = useQuery<Pokemon[], Error>({
    queryKey: isSearching
      ? ["searchPokemons", searchText]
      : selectedRarity
      ? ["fetchPokemonsByRarity", selectedRarity]
      : ["pokemons", { offset, limit }],
    queryFn: () =>
      isSearching
        ? searchPokemons(searchText)
        : selectedRarity
        ? fetchPokemonsByRarity(selectedRarity)
        : fetchPokemons(offset, limit),
    staleTime: Infinity,
    enabled: !isSearching || searchText.length > 0,
  });

  useEffect(() => {
    if (pokemons && pokemons.length < limit && !isSearching) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [pokemons, limit, isSearching]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setSelectedRarity(null); // Clear rarity when searching
    if (e.target.value.length > 0) {
      setIsSearching(true);
      setOffset(0); // Reset offset when starting a new search
    } else {
      setIsSearching(false);
      setOffset(0); // Reset offset when clearing search
    }
  };

  const handleRarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rarity = e.target.value as Rarity;
    setSelectedRarity(rarity);
    setSearchText(""); // Clear search text when selecting rarity
    setIsSearching(false);
    setOffset(0); // Reset offset when selecting rarity
  };

  const handlePrevious = () => {
    if (offset > 0) setOffset((prevOffset) => prevOffset - limit);
  };

  const handleNext = () => {
    if (!isFetching && hasMore) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  return (
    <Container>
      <h2>Pokémons</h2>
      <SearchInput
        type="text"
        placeholder="Search Pokémon by name..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <RaritySelect value={selectedRarity ?? ""} onChange={handleRarityChange}>
        <option value="" disabled>
          Select Rarity
        </option>
        {Object.values(Rarity).map((rarity) => (
          <option key={rarity} value={rarity}>
            {rarity}
          </option>
        ))}
      </RaritySelect>
      {isError ? (
        <ErrorText>Error fetching data: {error?.message}</ErrorText>
      ) : (
        <>
          <Row>
            {pokemons?.map((pokemon: Pokemon) => (
              <Link
                style={{ textDecoration: "none" }}
                key={pokemon.id}
                href={`/pokemon/${pokemon.id}`}
                passHref>
                <PokemonCard {...pokemon} />
              </Link>
            ))}
          </Row>
          {!isSearching && !selectedRarity && (
            <Row>
              <Button onClick={handlePrevious} disabled={offset === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={isFetching || !hasMore}>
                Next
              </Button>
            </Row>
          )}
          {isFetching ? <LoadingText>Loading...</LoadingText> : null}
        </>
      )}
    </Container>
  );
};

export default PokemonList;
