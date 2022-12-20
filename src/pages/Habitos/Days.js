import styled from "styled-components";
import React, { useState } from "react";

export default function Days({
  day,
  dayNumber,
  weekdays,
  setWeekdays,
  tarefas,
}) {
  const [selecionado, setSelecionado] = useState(false);

  function selecionaDia() {
    if (!selecionado) {
      setSelecionado(true);
      setWeekdays([...weekdays, dayNumber]);
    } else {
      setSelecionado(false);
      for (let i = 0; i < weekdays.length; i++) {
        if (weekdays[i] === dayNumber) {
          weekdays.splice(i, 1);
          weekdays.sort((a, b) => a - b);
        }
      }
    }
  }

  if (!tarefas) {
    return (
      <Box
        data-test="habit-day"
        className="flex"
        selecionado={selecionado}
        onClick={selecionaDia}
      >
        <h3>{day[0]}</h3>
      </Box>
    );
  } else {
    return (
      <Box
        data-test="habit-day"
        className="flex"
        selecionado={tarefas.includes(dayNumber)}
      >
        <h3>{day[0]}</h3>
      </Box>
    );
  }
}

const Box = styled.div`
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${(props) => (!props.selecionado ? "#fff" : "#cfcfcf")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  margin-right: 4px;
  cursor: default;
  h3 {
    font-size: 20px;
    color: ${(props) => (!props.selecionado ? "#dbdbdb" : "#fff")};
  }
`;
