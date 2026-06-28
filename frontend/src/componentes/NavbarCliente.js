import { Link, useNavigate } from "react-router-dom";

function NavbarCliente() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/cliente">
                    Cafetería Escolar
                </Link>

                <div>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/misdatos"
                    >
                        Mis Datos
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/menucliente"
                    >
                        Menú
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Cerrar Sesión
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default NavbarCliente;