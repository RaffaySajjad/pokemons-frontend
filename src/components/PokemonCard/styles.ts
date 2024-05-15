import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin: 10px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const PokemonName = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;
