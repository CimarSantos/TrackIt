import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "../assets/imgs/Logo.png";
import axios from "axios";

function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");

  function Cadastrar(e) {
    e.preventDefault();
    const body = {
      email: email,
      name: name,
      image: url,
      password: password,
    };
    axios
      .post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`,
        body
      )
      .then((res) => {
        alert("Cadastro realizado com sucesso! Faça seu login.");
        navigate("/");
      })
      .catch((err) => {
        alert(`${err.response.data.message} Tente novamente`);
      });
  }
  return (
    <>
      <LogoContainer className="flex">
        <img src={Logo} alt="TrakIt" />
      </LogoContainer>
      <Form className="flex" onSubmit={Cadastrar}>
        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <input
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <input
          type="url"
          placeholder="foto"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        ></input>
        <button type="submit">Cadastrar</button>
      </Form>
      <Link to="/">
        <LoginCadastro className="flex">
          <p>Já tem uma conta? Faça login!</p>
        </LoginCadastro>
      </Link>
    </>
  );
}

export default Cadastro;

const LoginCadastro = styled.div`
  padding: 30px 0;
  p {
    cursor: pointer;
    color: #52b6ff;
    font-size: 14px;
    text-decoration: underline;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  flex-direction: column;
  gap: 10px;
  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding: 15px;
    font-size: 20px;
    color: #d8d8d8;
  }
  button {
    width: 303px;
    height: 45px;
    border: none;
    background-color: #52b6ff;
    border-radius: 5px;
    font-size: 21px;
    color: #fff;
  }
`;

const LogoContainer = styled.div`
  padding-top: 20%;
  img {
    width: 250px;
  }
`;
