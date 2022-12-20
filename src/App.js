import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";

import UserContext from "./contexts/UserContext";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Habitos from "./pages/Habitos/Init";
import Historico from "./pages/Historico";
import Hoje from "./pages/Hoje";

function App() {
  const [user, setUser] = useState([]);
    const [token, setToken] = useState(null);
    const [completed, setCompleted] = useState(0);
    const contextValue = { user, setUser, token, setToken };
    return (
      <>
        <GlobalStyle />
        <UserContext.Provider value={contextValue}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login setCompleted={setCompleted} />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route
                path="/habitos"
                element={<Habitos completed={completed} />}
              />
              <Route
                path="/hoje"
                element={
                  <Hoje completed={completed} setCompleted={setCompleted} />
                }
              />
              <Route
                path="/historico"
                element={<Historico completed={completed} />}
              />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </>
    );
}

export default App;
