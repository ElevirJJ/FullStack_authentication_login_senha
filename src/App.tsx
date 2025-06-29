import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Cadastro/Login";
import CadastroUsuario from "./pages/Cadastro/CadastroUsuario"; // import da nova página de cadastro
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import CadastroCategoria from "./pages/Cadastro/CadastroCategoria"; // corrigido o nome da importação
import PaginaBaseFormulario from "./pages/PaginaBaseFormulario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} /> {/* nova rota pública */}

        {/* Rotas protegidas com a logo/estilização */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PaginaBaseFormulario>
                <Dashboard />
              </PaginaBaseFormulario>
            </PrivateRoute>
          }
        />
        <Route
          path="/categoria"
          element={
            <PrivateRoute>
              <PaginaBaseFormulario>
                <CadastroCategoria />
              </PaginaBaseFormulario>
            </PrivateRoute>
          }
        />

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
