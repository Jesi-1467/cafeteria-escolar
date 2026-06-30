import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if (!email.trim() || !password.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await API.post("login/", {
                email: email.trim().toLowerCase(),
                password: password.trim()
            });

            const user = response.data;

            localStorage.setItem("usuario", JSON.stringify(user));

            if (user.id_rol === 1) {
                navigate("/admin");
            } else {
                navigate("/cliente");
            }

        } catch (error) {
            console.error(error);
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            
            {/* NAVBAR */}
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

            {/* LOGIN CARD */}
            <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "10vh" }}>
                <div className="card p-4 shadow-sm border-0" style={{ maxWidth: "400px", width: "100%" }}>
                    
                    <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>

                    {/* EMAIL */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="nombre@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        className="btn btn-primary w-100 fw-semibold"
                        onClick={login}
                    >
                        Iniciar sesión
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Login;