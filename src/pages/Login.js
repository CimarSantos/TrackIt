import styled from "styled-components";
import { Link } from "react-router-dom";

import Logo from "../assets/imgs/Logo.png";

function Login() {
  return (
    <>
      <LogoContainer className="flex">
        <img src={Logo} alt="TrakIt" />
      </LogoContainer>
      <Form className="flex">
        <input type="email" placeholder="e-mail"></input>
        <input type="password" placeholder="senha"></input>
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
