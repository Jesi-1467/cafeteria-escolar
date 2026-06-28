import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
        const response = await API.get("usuarios/");
        const usuarios = response.data;
        const user = usuarios.find(u => u.email === email && u.password === password);
        if (!user) {
            alert("Credenciales incorrectas");
            return;
        }
        localStorage.setItem("usuario", JSON.stringify(user));
        if(user.id_rol === 1) {
            navigate("/admin");
        } else {
            navigate("/cliente");
        }
    }catch (error) {
        console.error("Error al iniciar sesión", error);
    }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4"style={{ width: "400px" }}>
                <div className="text-center mb-4">
                    <h3 className="text-success">Cafeteria escolar</h3>
                    <p className="text-muted">Iniciar sesión para continuar</p>
                </div>
                <div className="mb-3">
                     <label className="form-label">
                     Correo electrónico
                     </label>
                     <input className="form-control" type="email" placeholder="correoescuela@escuela.edu" onChange={e => setEmail(e.target.value)} />
                </div>
                    <div className="mb-3">
                      <label className="form-label">
                       Contraseña
                      </label>
                     <input className="form-control" type="password" placeholder="***********" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="d-grid">
                    <button className="btn btn-success" onClick={login}>
                        Iniciar sesión
                    </button>
                    </div>
            </div>
        </div>
    );
}
export default Login;