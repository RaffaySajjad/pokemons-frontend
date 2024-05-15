import { Pokemon } from "@/utils/types";
import { Card, PokemonImage, PokemonName } from "./styles";

const PokemonCard: React.FC<Pokemon> = (props) => {
  const { filePath, name } = props;

  return (
    <Card data-testid="pokemon-card">
      <PokemonImage src={filePath} alt={name} data-testid="pokemon-image" />
      <PokemonName data-testid="pokemon-name">{name}</PokemonName>
    </Card>
  );
};

export default PokemonCard;
