import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Importa Link
import { useState } from "react";
import styled from "styled-components";
import PaginaBaseFormulario from "../PaginaBaseFormulario";

type LoginFormInputs = {
  login: string;
  senha: string;
};

// Estilos (mantém todos os estilos que já tinha)
const Titulo = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  margin-left: 7rem;
`;

const Formulario = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Campo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Botao = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #32ad61;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0be241;
  }
`;

const MensagemErro = styled.p`
  color: #aa0000;
  margin-top: 1rem;
`;

// Novo estilo para o link de cadastro
const LinkCadastro = styled(Link)`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #131313;
  text-decoration: none;
  text-align: center;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [erroLogin, setErroLogin] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      localStorage.removeItem("token");

      const response = await axios.post("http://localhost:8080/login", data);

      const token = response.data.tokenJWT;
      if (!token) {
        throw new Error("Token JWT não recebido.");
      }

      localStorage.setItem("token", token);
      setErroLogin("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
      setErroLogin("Login inválido. Verifique suas credenciais.");
    }
  };

  return (
    <PaginaBaseFormulario>
      <Titulo>Login</Titulo>
      <Formulario onSubmit={handleSubmit(onSubmit)}>
        <Campo>
          <Label htmlFor="login">Login:</Label>
          <Input id="login" type="text" {...register("login")} />
        </Campo>
        <Campo>
          <Label htmlFor="senha">Senha:</Label>
          <Input id="senha" type="password" {...register("senha")} />
        </Campo>
        <Botao type="submit">Entrar</Botao>
      </Formulario>

      {/* Link para a página de cadastro */}
      <LinkCadastro to="/cadastro">Não tem conta? Cadastre-se aqui</LinkCadastro>

      {erroLogin && <MensagemErro>{erroLogin}</MensagemErro>}
    </PaginaBaseFormulario>
  );
};

export default Login;
