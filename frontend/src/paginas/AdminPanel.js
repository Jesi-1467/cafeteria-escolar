import NavbarAdmin from "../componentes/NavbarAdmin";
import { Link, } from "react-router-dom";

function AdminPanel() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    return (
        <>
            <NavbarAdmin />

            <div className="container mt-4">

                <h1 className="fw-bold mb-4">
                    Panel Administrador
                </h1>

                <hr />

                <h3 className="mb-5">
                    Bienvenido {usuario?.nombre}
                </h3>

                <div className="row g-4">

                    {/* PRODUCTOS */}
                    <div className="col-md-3">

                        <Link
                            to="/productos"
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h3 className="fw-bold">
                                        Productos
                                    </h3>

                                    <p className="text-muted">
                                        Gestionar productos
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>

                    {/* CATEGORIAS */}
                    <div className="col-md-3">

                        <Link
                            to="/categorias"
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h3 className="fw-bold">
                                        Categorías
                                    </h3>

                                    <p className="text-muted">
                                        Gestionar categorías
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>

                    {/* USUARIOS */}
                    <div className="col-md-3">

                        <Link
                            to="/usuarios"
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h3 className="fw-bold">
                                        Usuarios
                                    </h3>

                                    <p className="text-muted">
                                        Gestionar usuarios
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>

                    {/* PEDIDOS */}
                    <div className="col-md-3">

                        <div className="card shadow-sm h-100">

                            <div className="card-body">

                                <h3 className="fw-bold">
                                    Pedidos
                                </h3>

                                <p className="text-muted">
                                    Gestionar pedidos
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default AdminPanel;