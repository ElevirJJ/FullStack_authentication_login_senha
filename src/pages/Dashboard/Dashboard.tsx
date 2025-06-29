import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserNameFromToken } from "../services/jwUtils";
import styled from "styled-components";

const Titulo = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-left: 5rem;
`;

const Saudacao = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Botoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Botão verde com hover suave
const BotaoVerde = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #08d359;
  }
`;

// Botão vermelho com hover suave
const BotaoVermelho = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eb1805;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setAutenticado(true);
    }
  }, [navigate]);

  if (!autenticado) {
    return <p>Verificando autenticação...</p>;
  }

  const nomeUsuario = getUserNameFromToken();

  const irParaCadastroPaciente = () => {
    navigate("/categoria");
  };

  const sair = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Titulo>Dashboard</Titulo>
      <Saudacao>Bem-vindo, {nomeUsuario}!</Saudacao>
      <Botoes>
        <BotaoVerde onClick={irParaCadastroPaciente}>Cadastrar Categoria</BotaoVerde>
        <BotaoVermelho onClick={sair}>Sair</BotaoVermelho>
      </Botoes>
    </>
  );
};

export default Dashboard;
