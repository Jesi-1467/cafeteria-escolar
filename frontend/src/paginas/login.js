import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
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
        <div className="container mt-5">

            <h2>Login</h2>

            <input
                type="text"
                placeholder="Email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="form-control mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary" onClick={login}>
                Iniciar sesión
            </button>

        </div>
    );
}

export default Login;