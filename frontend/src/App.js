import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import Login from "./paginas/login";
import AdminPanel from "./paginas/AdminPanel";
import Usuarios from "./paginas/Usuarios";
import Cliente from "./paginas/Cliente";
import MisDatos from "./paginas/MisDatos";
import MenuCliente from "./paginas/MenuCliente";
import Productos from "./paginas/Productos";
import Categorias from "./paginas/Categorias";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/misdatos" element={<MisDatos />} />
        <Route path="/menucliente" element={<MenuCliente />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;