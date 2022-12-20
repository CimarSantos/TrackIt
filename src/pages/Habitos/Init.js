import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import Topo from "../../components/Topo";
import lixo from "../../assets/imgs/lixo.png";
import fundoBotao from "../../assets/imgs/fundoBotao.png";
import Dias from "./Days";
import NovoHabito from "./NewHabit";

function BoxHabito({ tarefadiaria, name, id, habitos, setHabitos, index }) {
  const { token } = useContext(UserContext);
  const days = [
    { day: "Domingo", dayNumber: 0 },
    { day: "Segunda", dayNumber: 1 },
    { day: "Terça", dayNumber: 2 },
    { day: "Quarta", dayNumber: 3 },
    { day: "Quinta", dayNumber: 4 },
    { day: "Sexta", dayNumber: 5 },
    { day: "Sábado", dayNumber: 6 },
  ];

  function deletaHabito() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
      config
    );
    habitos.splice(index, 1);
    setHabitos([...habitos]);
  }
  return (
    <ListadeHabitos data-test="habit-container">
      <div>
        <h3>{name}</h3>
        <img
          data-test="habit-delete-btn"
          src={lixo}
          alt="lixeira"
          onClick={deletaHabito}
        />
      </div>
      <span>
        {days.map((value, index) => (
          <Dias
            data-test="habit-day"
            key={index}
            day={value.day}
            dayNumber={value.dayNumber}
            tarefadiaria={tarefadiaria}
          />
        ))}
      </span>
    </ListadeHabitos>
  );
}

const Principal = ({ completed }) => {
  const navigate = useNavigate();
  const [nomeHabito, setNomeHabito] = useState("");
  const [habitos, setHabitos] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [adcNovo, setAdcNovo] = useState(false);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise.then((response) => {
      setHabitos(response.data);
    });
  }, []);

  return (
    <>
      <Topo />
      <TelaPrincipal>
        <ContainerHabitos>
          <UserHabits>
            <h3>Meu Hábitos</h3>
            <button
              data-test="habit-create-btn"
              onClick={() => setAdcNovo(true)}
            >
              <img src={fundoBotao} alt="botaoAdd" />
              <h4>+</h4>
            </button>
          </UserHabits>
          {adcNovo ? (
            <NovoHabito
              data-test="habit-create-container"
              habitos={habitos}
              setHabitos={setHabitos}
              nomeHabito={nomeHabito}
              setNomeHabito={setNomeHabito}
              weekdays={weekdays}
              setWeekdays={setWeekdays}
              setAdcNovo={setAdcNovo}
            />
          ) : (
            <></>
          )}
          {habitos.length === 0 ? (
            <p>
              Você ainda não tem nenhum hábito cadastrado. Adicione um hábito
              para começar a trackear!
            </p>
          ) : (
            habitos.map((value, index) => (
              <BoxHabito
                data-test="habit-container"
                habitos={habitos}
                setHabitos={setHabitos}
                name={value.name}
                tarefadiaria={value.days}
                id={value.id}
                index={index}
                key={index}
              />
            ))
          )}
        </ContainerHabitos>
      </TelaPrincipal>
      <BarraFooter className="flex">
        <h3 data-test="habit-link" onClick={() => navigate("/habitos")}>
          Hábitos
        </h3>

        <MenuHoje data-test="today-link" className="flex">
          <Link to={`/hoje`}>
            <CircularProgressbar
              data-test="today-link"
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

        <h3 data-test="history-link" onClick={() => navigate("/historico")}>
          Histórico
        </h3>
      </BarraFooter>
    </>
  );
};

const ContainerHabitos = styled.div`
  padding: 30px 0;
  > p {
    font-weight: 400;
    font-size: 18px;
    color: #676767;
  }
`;
const UserHabits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  h3 {
    font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    color: #126ba5;
  }
  button {
    background-color: #e5e5e5;
    position: relative;
    border: none;
    cursor: pointer;
  }
  button h4 {
    font-size: 27px;
    line-height: 34px;
    text-align: center;
    color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -1px;
  }
`;
const TelaPrincipal = styled.div`
  padding: 10px 20px 100px 20px;
  background: #e5e5e5;
  min-height: 100vh;
`;

const ListadeHabitos = styled.div`
  margin-bottom: 10px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  padding: 15px;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    h3 {
      font-weight: 400;
    }
  }
  > div p {
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
  }
  > div img {
    width: 13px;
    height: 15px;
  }
  span {
    display: flex;
  }
  span div {
    align-items: center;
    justify-content: center;
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
  z-index: 1;
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

export default Principal;
