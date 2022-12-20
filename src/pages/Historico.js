import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import Topo from "../components/Topo.js";

export default function Historico({ completed }) {
  const navigate = useNavigate();
  return (
    <>
      <Topo />
      <Container>
        <h2>Histórico</h2>
        <h4>Em breve você poderá o histórico dos seus hábitos aqui!</h4>
      </Container>
      <BarraFooter className="flex">
        <h3 onClick={() => navigate("/habitos")}>Hábitos</h3>

        <MenuHoje className="flex">
          <Link to={`/hoje`}>
            <CircularProgressbar
              value={completed * 100}
              text={`Hoje`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#52b6ff",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
            />
          </Link>
        </MenuHoje>

        <h3 onClick={() => navigate("/historico")}>Histórico</h3>
      </BarraFooter>
    </>
  );
}

const Container = styled.div`
  padding: 30px 20px;
  background-color: #e5e5e5;
  height: 100vh;
  h2 {
    font-size: 23px;
    color: #126ba5;
    font-weight: 400;
    padding: 5px 0;
  }

  h4 {
    font-size: 18px;
    color: #bababa;
    font-weight: 400;
    margin-top: 20px;
    padding-bottom: 10px;
  }
`;

const BarraFooter = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  justify-content: space-around;
  padding: 0 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  position: fixed;
  bottom: 0;

  h3 {
    color: #52b6ff;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
  }
`;

const MenuHoje = styled.div`
  width: 91px;
  height: 91px;
  background-color: #52b6ff;
  border-radius: 50%;
  margin-bottom: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);

  h2 {
    color: white;
    font-size: 18px;
    font-weight: 400;
  }
`;
