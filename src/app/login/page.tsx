"use client";

import apiClient from "@/utils/apiClient";
import { HttpStatusCode } from "axios";
import React, { useState } from "react";
import {
  Button,
  Container,
  ErrorText,
  Form,
  Input,
  Label,
  Title,
} from "./styles";

type Auth = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [auth, setAuth] = useState<Auth>({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = auth;
    try {
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });
      if (response?.status === HttpStatusCode.Ok) {
        window.location.href = "/";
      } else {
        setError("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [name]: value,
    }));
    setError(null);
  };

  return (
    <main>
      <Container>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Label>
            Username:
            <Input
              type="text"
              name="username"
              value={auth.username}
              onChange={handleAuthChange}
            />
          </Label>
          <Label>
            Password:
            <Input
              name="password"
              type="password"
              value={auth.password}
              onChange={handleAuthChange}
            />
          </Label>
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    </main>
  );
};

export default Login;
