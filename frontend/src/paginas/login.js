import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        // VALIDACIÓN: Verifica si alguno de los campos está vacío o solo contiene espacios
        if (!email.trim() || !password.trim()) {
            alert("Por favor, completa todos los campos.");
            return; // Detiene la función aquí para que no intente consultar la API
        }

        try {
            const response = await API.get("usuarios/");
            const usuarios = response.data;

            const user = usuarios.find(
                u => u.email === email && u.password === password
            );

            if (!user) {
                alert("Credenciales incorrectas");
                return;
            }

            localStorage.setItem("usuario", JSON.stringify(user));

            if (user.id_rol === 1) {
                navigate("/admin");
            } else {
                navigate("/cliente");
            }

        } catch (error) {
            console.error(error);
            alert("Error al iniciar sesión");
        }
    };

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            
            {/* --- BARRA SUPERIOR (NAVBAR) --- */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
                <div className="container-fluid">
                    <span className="navbar-brand fw-bold text-white">
                        Cafetería
                    </span>
                    <div className="d-flex">
                        <button 
                            className="btn btn-outline-light btn-sm fw-semibold px-3"
                            onClick={() => navigate("/")}
                        >
                            Inicio
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- CONTENEDOR DEL LOGIN --- */}
            <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "10vh" }}>
                <div className="card p-4 shadow-sm border-0" style={{ maxWidth: "400px", width: "100%" }}>
                    <div className="card-body">
                        
                        <h2 className="card-title text-center mb-4 fw-bold text-dark">Iniciar Sesión</h2>

                        {/* Campo de Email */}
                        <div className="mb-3">
                            <label className="form-label text-muted small fw-semibold">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="nombre@ejemplo.com"
                                className="form-control py-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Campo de Contraseña */}
                        <div className="mb-4">
                            <label className="form-label text-muted small fw-semibold">Contraseña</label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="form-control py-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Botón Principal */}
                        <button className="btn btn-primary w-100 py-2 fw-semibold" onClick={login}>
                            Iniciar sesión
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;