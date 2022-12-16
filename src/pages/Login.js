import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

import Logo from "../assets/imgs/Logo.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  function fazerLogin(e) {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    axios
      .post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`,
        body
      )
      .then((res) => {
        setToken(res.data.token);
        setUser(res.data);
        navigate("/hoje");
      })
      .catch((err) => {
        alert(`${err.response.data.message} Tente novamente!`);
      });
  }
  return (
    <>
      <LogoContainer className="flex">
        <img src={Logo} alt="TrakIt" />
      </LogoContainer>
      <Form className="flex" onSubmit={fazerLogin}>
        <input
          type="email"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Entrar</button>
      </Form>
      <Link to="/cadastro">
        <LoginCadastro className="flex">
          <p>Não tem uma conta? Cadastre-se!</p>
        </LoginCadastro>
      </Link>
    </>
  );
}

export default Login;

const LoginCadastro = styled.div`
  justify-content: center;
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
  justify-content: center;
  padding-top: 10%;
  img {
    width: 250px;
  }
`;
