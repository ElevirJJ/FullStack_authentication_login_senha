import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../pages/services/axiosConfi";

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  background-color: #555e58;
`;

const BoasVindas = styled.h2`
  margin-bottom: 1.5rem;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Botao = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const BotaoSair = styled(Botao)`
  background-color: #dc3545;

  &:hover {
    background-color: #a71d2a;
  }
`;

const MensagemErro = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const Dashboard = () => {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const nomeUsuario = localStorage.getItem("nomeUsuario") || "Usuário";

  const handleCadastrarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nomeCategoria.trim()) {
      setErro("O nome da categoria é obrigatório.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado.");
        navigate("/login");
        return;
      }


      const dados = { nome: nomeCategoria };

      await api.post("/categorias", dados, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSucesso("Categoria cadastrada com sucesso!");
      setNomeCategoria("");
    } catch (error) {
      console.error(error);
      setErro("Erro ao cadastrar categoria. Tente novamente.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nomeUsuario");
    navigate("/login");
  };

  return (
    <Container>
      <BoasVindas>Bem-vindo, {nomeUsuario}!</BoasVindas>

      <Formulario onSubmit={handleCadastrarCategoria}>
        <Input
          type="text"
          placeholder="Nome da categoria"
          value={nomeCategoria}
          onChange={(e) => setNomeCategoria(e.target.value)}
        />
        {erro && <MensagemErro>{erro}</MensagemErro>}
        {sucesso && <p style={{ color: "#0fdf8c" }}>{sucesso}</p>}
        <Botao type="submit">Cadastrar Categoria</Botao>
      </Formulario>

      <BotaoSair onClick={handleLogout}>Sair</BotaoSair>
    </Container>
  );
};

export default Dashboard;
