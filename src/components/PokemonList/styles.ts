import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Container = styled(Column)`
  max-width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  width: fit-content;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-weight: bold;
`;

export const LoadingText = styled.p`
  font-weight: bold;
  margin-top: 10px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const RaritySelect = styled.select`
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;
