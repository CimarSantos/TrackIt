import styled from "styled-components";
import UserContext from "../contexts/UserContext";

import LogoTop from "../assets/imgs/LogoTopp.png";
import { useContext } from "react";

function Topo() {
  const { user } = useContext(UserContext);
  return (
    <>
      <TopBar data-test="header">
        <img src={LogoTop} alt="TrakIt" />
        <User src={user.image} alt="UserImage" />
      </TopBar>
    </>
  );
}

export default Topo;

const TopBar = styled.div`
  height: 70px;
  background-color: #126ba5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 0 10px #000;
`;

const User = styled.img`
  width: 54px;
  height: 54px;
  background-color: #fff;
  border-radius: 50%;
`;
