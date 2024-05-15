"use client";

import apiClient from "@/utils/apiClient";
import { Pokemon } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  Container,
  Header,
  DetailsSection,
  BattleSection,
  ImageContainer,
  BackButton,
  Footer,
} from "./styles";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const fetchPokemonDetails = async (id: number) => {
  const response = await apiClient.get("pokemons", {
    params: { id },
  });
  return response.data;
};

const fetchCompetitors = async () => {
  const response = await apiClient.get("pokemons/competitors");
  return response.data;
};

const getBattleResult = async (pokemonId: number, competitorId: number) => {
  const response = await apiClient.get("pokemons/simulateBattle", {
    params: { attacker: pokemonId, defender: competitorId },
  });
  return response.data;
};

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: competitors } = useQuery<Pokemon[], Error>({
    queryKey: ["competitors"],
    queryFn: () => fetchCompetitors(),
    staleTime: Infinity,
  });

  const [selectedCompetitor, setSelectedCompetitor] = useState<number | null>(
    competitors?.[0]?.id ?? null
  );
  const [battleResult, setBattleResult] = useState<string | null>(null);

  const {
    data: pokemon,
    isError,
    error,
    isFetching,
  } = useQuery<Pokemon[], Error>({
    queryKey: ["pokemons", { id }],
    queryFn: () => fetchPokemonDetails(+id),
    staleTime: Infinity,
  });

  const handleBattle = async () => {
    if (selectedCompetitor !== null) {
      const result = await getBattleResult(+id, selectedCompetitor);
      console.log("result", result);
      setBattleResult(result.message);
    }
  };

  if (isFetching) return <div>Loading...</div>;

  if (isError || !pokemon)
    return <div>Error fetching data: {error?.message}</div>;

  // Searching by id will yield only one result
  const selectedPokemon = pokemon?.[0];
  const { id: pokemonId, name, rarity, filePath } = selectedPokemon;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => router.back()}>Back</BackButton>
      </Header>
      <DetailsSection>
        <h2>Pokemon Details</h2>
        <ImageContainer>
          <h3>{name}</h3>
          <Image width={250} height={445} src={filePath} alt={name} />
        </ImageContainer>
        <p>Rarity: {rarity}</p>
      </DetailsSection>
      <BattleSection>
        <h3>Battle with</h3>
        <select
          value={selectedCompetitor ?? ""}
          onChange={(e) => setSelectedCompetitor(Number(e.target.value))}>
          <option value="" disabled>
            Select a competitor
          </option>
          {competitors?.map((competitor) => {
            if (competitor.id === pokemonId) return null;
            return (
              <option key={competitor.id} value={competitor.id}>
                {competitor.name}
              </option>
            );
          })}
        </select>
        <button onClick={handleBattle}>Battle</button>
        {battleResult && <Footer>Winner: {battleResult}</Footer>}
      </BattleSection>
    </Container>
  );
};

export default PokemonDetails;
