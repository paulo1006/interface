import Home from "./componentes/Home";
import Eventos from "./componentes/Eventos";
import Sobre from "./componentes/sup";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import { Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Sistema de gestao</h1>

      <BrowserRouter>
        <Nav variant="tabs" className="justify-content-between">
          <div className="d-flex">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/eventos">Eventos</Nav.Link>
            <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
          </div>
          <div className="config">
            <NavDropdown title="Detalhes" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Conta</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Salvos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Suporte</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">sair</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
