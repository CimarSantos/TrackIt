import styled from "styled-components";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <>
      <MenuBar className="flex">
        <Link to="/habitos">
          <p> Hábitos</p>
        </Link>
        <div className="flex">
          <Link to="/hoje">Hoje</Link>
        </div>
        <Link to="/historico">
          <p> Histórico </p>
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
  p {
    font-size: 18px;
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
  }
`;
