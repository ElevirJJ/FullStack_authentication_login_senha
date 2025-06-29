import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaginaBaseFormulario from "../PaginaBaseFormulario";
import styled from "styled-components";

const Titulo = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
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
  margin-top: 0.25rem;
  font-size: 0.875rem;
`;

type CadastroUsuarioInputs = {
  login: string;
  senha: string;
};

const CadastroUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroUsuarioInputs>();
  const navigate = useNavigate();
  const [erroCadastro, setErroCadastro] = useState("");

  const onSubmit = async (data: CadastroUsuarioInputs) => {
    try {
      setErroCadastro("");
    
      await axios.post("http://localhost:8080/cadastros", data);


      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setErroCadastro("Falha ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <PaginaBaseFormulario>
      <Titulo>Cadastro de Usuário</Titulo>
      <Formulario onSubmit={handleSubmit(onSubmit)}>
        <Campo>
          <Label htmlFor="login">Login:</Label>
          <Input
            id="login"
            type="text"
            {...register("login", { required: "Login é obrigatório" })}
          />
          {errors.login && <MensagemErro>{errors.login.message}</MensagemErro>}
        </Campo>

        <Campo>
          <Label htmlFor="senha">Senha:</Label>
          <Input
            id="senha"
            type="password"
            {...register("senha", { required: "Senha é obrigatória" })}
          />
          {errors.senha && <MensagemErro>{errors.senha.message}</MensagemErro>}
        </Campo>

        <Botao type="submit">Cadastrar</Botao>

        {erroCadastro && <MensagemErro>{erroCadastro}</MensagemErro>}
      </Formulario>
    </PaginaBaseFormulario>
  );
};

export default CadastroUsuario;
