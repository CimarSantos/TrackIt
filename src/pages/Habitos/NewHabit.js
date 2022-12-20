import React, { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import UserContext from "../../contexts/UserContext.js";
import styled from "styled-components";
import Dias from "./Days";

export default function NovoHabito({
  weekdays,
  setWeekdays,
  setAdcNovo,
  nomeHabito,
  setNomeHabito,
  habitos,
  setHabitos,
}) {
  const [habilita, setHabilita] = useState(false);
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

  function salvarNovo() {
    if (weekdays.length === 0) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      name: nomeHabito,
      days: weekdays,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );
    setHabilita(true);
    promise.then((response) => {
      setHabitos([...habitos, response.data]);
      setWeekdays([]);
      setNomeHabito("");
      setHabilita(false);
      setAdcNovo(false);
    });
  }
  return (
    <BoxNovoHabito data-test="habit-create-container">
      <input
        data-test="habit-name-input"
        type="text"
        disabled={habilita}
        placeholder="Qual é o seu novo hábito?"
        value={nomeHabito}
        onChange={(e) => setNomeHabito(e.target.value)}
      />
      <div className="diasSemana">
        {days.map((value, index) => (
          <Dias
            data-test="habit-day"
            disabled={habilita}
            key={index}
            day={value.day}
            dayNumber={value.dayNumber}
            weekdays={weekdays}
            setWeekdays={setWeekdays}
          />
        ))}
      </div>
      <div className="salvaHabito">
        <div>
          <ButtonCancel
            data-test="habit-create-cancel-btn"
            disable={habilita}
            onClick={() => setAdcNovo(false)}
          >
            Cancelar
          </ButtonCancel>
          <ButtonSave
            data-test="habit-create-save-btn"
            disable={habilita}
            onClick={salvarNovo}
          >
            {habilita ? (
              <ThreeDots color="#fff" height={20} width={50} />
            ) : (
              "Salvar"
            )}
          </ButtonSave>
        </div>
      </div>
    </BoxNovoHabito>
  );
}

const BoxNovoHabito = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 30px;
  padding: 18px;
  input {
    border: none;
    width: 100%;
    padding: 10px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin-bottom: 8px;
  }
  input::placeholder {
    font-size: 18px;
    line-height: 25px;
    color: #dbdbdb;
  }
  button:disabled,
  input:disabled,
  .diasSemana:disabled {
    opacity: 0.4;
  }
  input:disabled {
    color: #afafaf;
    background: #f2f2f2;
  }

  .diasSemana {
    display: flex;
    margin-bottom: 30px;
    gap: 10px;
  }

  .salvaHabito {
    justify-content: space-between;
  }
  div {
    margin-right: 0;
  }
`;

const ButtonSave = styled.button`
  border: none;
  background: #52b6ff;
  border-radius: 4.63636px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  padding: 7px 17px;
  margin-left: 18px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #52b6ff;
  }
`;

const ButtonCancel = styled.button`
  background: #ffffff;
  border: none;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  padding: 7px 17px;
  color: #52b6ff;
  cursor: pointer;
  &:hover {
    border: none;
    background: #52b6ff;
    border-radius: 5px;
    text-align: center;
    color: #ffffff;
  }
`;
