import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  padding: 20px;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const DetailsSection = styled.article`
  margin-bottom: 20px;
  text-align: center;

  h2 {
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 5px;
  }
`;

export const BattleSection = styled.section`
  text-align: center;

  h3 {
    margin-bottom: 10px;
  }

  select {
    padding: 5px;
    margin-bottom: 10px;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #0056b3;
    }
  }

  div {
    margin-top: 10px;
    font-weight: bold;
  }
`;

export const ImageContainer = styled.figure`
  margin-bottom: 20px;

  img {
    border-radius: 10px;
  }
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;

  &:hover {
    background-color: #5a6268;
  }
`;

export const Footer = styled.footer`
  margin-top: 20px;
  font-weight: bold;
`;
