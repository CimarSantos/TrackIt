import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";

import UserContext from "./contexts/UserContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Habitos from "./pages/Habitos";
import Historico from "./pages/Historico";
import Hoje from "./pages/Hoje";

function App() {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const contextValue = { user, setUser, token, setToken };
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={contextValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/hoje" element={<Hoje />} />
            <Route path="/historico" element={<Historico />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
