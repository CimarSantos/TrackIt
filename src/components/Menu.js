import styled from "styled-components";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <>
      <MenuBar data-test="menu" className="flex">
        <Link to="/habitos">
          <p data-test="habit-link"> Hábitos</p>
        </Link>
        <div className="flex">
          <Link to="/hoje">
            <span data-test="today-link"> Hoje </span>
          </Link>
        </div>
        <Link to="/historico">
          <p data-test="history-link"> Histórico </p>
        </Link>
      </MenuBar>
    </>
  );
}

export default Menu;

const MenuBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  justify-content: space-around;
  gap: 25%;
  box-shadow: 0 0 5px #000;
  p {
    font-size: 20px;
    color: #52b6ff;
    cursor: pointer;
  }
  div {
    position: absolute;
    justify-content: center;
    background-color: #52b6ff;
    width: 91px;
    height: 91px;
    border-radius: 50%;
    margin-bottom: 50px;
    box-shadow: 0 -1px 5px #000;

    &:hover {
      box-shadow: 0 0 10px red;
    }
    span {
      font-size: 20px;
      color: #fff;
      font-weight: 500;
    }
  }
`;
