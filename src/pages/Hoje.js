import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Topo from "../components/Topo";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import "react-circular-progressbar/dist/styles.css";
import feito from "../assets/imgs/feito.png";

import axios from "axios";
import UserContext from "../contexts/UserContext";

function getToday(config, setHabitos, setCompleted) {
  const promise = axios.get(
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
    config
  );
  promise.then((response) => {
    setHabitos([...response.data]);
    let contador = 0;
    let qtdHabitos = response.data.length;
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].done === true) {
        contador++;
      }
    }
    if (qtdHabitos !== 0) {
      setCompleted(contador / qtdHabitos);
    } else {
      setCompleted(0);
    }
  });
}

function Habito({
  name,
  done,
  id,
  setCompleted,
  setUserHabits,
  currentSequence,
  highestSequence,
}) {
  const [selected, setSelected] = useState(done);
  const { token } = useContext(UserContext);

  function toggleSelect() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (!selected) {
      setSelected(true);
      done = true;
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        {},
        config
      );
      promise.then(() => {
        getToday(config, setUserHabits, setCompleted);
      });
    } else {
      setSelected(false);
      done = false;
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
        {},
        config
      );
      promise.then(() => {
        getToday(config, setUserHabits, setCompleted);
      });
    }
  }

  return (
    <HabitBox
      data-test="today-habit-container"
      selected={selected}
      currentSequence={currentSequence}
      highestSequence={highestSequence}
    >
      <div>
        <p data-test="today-habit-name">{name}</p>
        <span>
          <h3>Sequência atual: </h3>
          <h4 data-test="today-habit-sequence">
            {" "}
            {` ${currentSequence}`} dia(s)
          </h4>
        </span>
        <span>
          <h3>Seu recorde: </h3>
          <h4 data-test="today-habit-record">
            {" "}
            {` ${highestSequence}`} dia(s)
          </h4>
        </span>
      </div>
      <button data-test="today-habit-check-btn" onClick={toggleSelect}>
        <img src={feito} alt="Feito" />
      </button>
    </HabitBox>
  );
}

const Hoje = ({ setCompleted, completed }) => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const [userHabits, setUserHabits] = useState([0]);
  const [date, setDate] = useState("");
  const [weekday, setWeekday] = useState("");

  useEffect(() => {
    const day = dayjs().locale("pt-br");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    getToday(config, setUserHabits, setCompleted);
    setWeekday(day.format("dddd"));
    setDate(day.format("DD/MM"));
  }, []);
  return (
    <>
      <Topo />
      <Habitos>
        <div className="habitosHoje">
          <h2 data-test="today">
            {weekday.charAt(0).toUpperCase() + weekday.slice(1)}, {date}
          </h2>
          {completed === 0 ? (
            <h4 data-test="today-counter">Nenhum hábito concluído ainda</h4>
          ) : (
            <h4 data-test="today-counter">
              {completed * 100}% dos hábitos concluídos{" "}
            </h4>
          )}
        </div>
        <div className="MeusHabitos">
          {userHabits[0] === 0 || userHabits[0] === undefined ? (
            <p>
              Você ainda não tem nenhum hábito cadastrado. Adicione um hábito
              para começar a trackear!
            </p>
          ) : (
            userHabits.map((value, index) => (
              <Habito
                data-test="today-habit-container"
                setUserHabits={setUserHabits}
                setCompleted={setCompleted}
                userHabits={userHabits}
                id={value.id}
                name={value.name}
                done={value.done}
                currentSequence={value.currentSequence}
                highestSequence={value.highestSequence}
                key={index}
              />
            ))
          )}
        </div>
      </Habitos>
      <BarraFooter data-test="menu" className="flex">
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

const Habitos = styled.div`
  padding: 30px 20px;
  background-color: #e7e7e7;
  height: 100vh;
  .habitosHoje h2 {
    font-size: 23px;
    color: #126ba5;
    font-weight: 400;
    padding: 5px 0;
  }

  .habitosHoje h4 {
    font-size: 18px;
    color: #bababa;
    font-weight: 400;
    padding-bottom: 10px;
  }

  .MeusHabitos {
    widows: 100%;
  }
`;

const HabitBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding: 13px 15px;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  div {
    width: calc(100% - 69px);
  }
  div span {
    display: flex;
  }
  p {
    font-size: 20px;
    line-height: 25px;
    color: #666666;
  }
  h3,
  h4 {
    word-wrap: break-word;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    margin-right: 3px;
  }
  h4 {
    margin-right: 0;
    color: ${(props) =>
      props.highestSequence === props.currentSequence &&
      props.currentSequence !== 0
        ? "#8FC549"
        : "#666666;"};
  }
  > button {
    width: 69px;
    height: 69px;
    background: ${(props) => (props.selected ? "#8FC549" : "#EBEBEB")};
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    position: relative;
    img {
      position: absolute;
      top: 20px;
      left: 17px;
    }
  }
`;

const BarraFooter = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  justify-content: space-around;
  padding: 0 20px;
  box-shadow: 0 0 5px #000;
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
  box-shadow: 0 0 5px #000;

  h2 {
    color: white;
    font-size: 18px;
    font-weight: 400;
  }
`;

export default Hoje;
