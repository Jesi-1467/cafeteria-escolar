import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import API from "../api/api";
import NavbarAdmin from "../componentes/NavbarAdmin";

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await API.get("usuarios/");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    return (
        <>
            <NavbarAdmin />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h2>Lista de Usuarios</h2>

                    <Link
                        to="/admin"
                        className="btn btn-secondary"
                    >
                        ← Regresar al Panel
                    </Link>

                </div>

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Activo</th>
                        </tr>
                    </thead>

                    <tbody>

                        {usuarios.map((usuario) => (

                            <tr key={usuario.id_usuario}>

                                <td>{usuario.id_usuario}</td>

                                <td>{usuario.nombre}</td>

                                <td>{usuario.email}</td>

                                <td>{usuario.id_rol}</td>

                                <td>
                                    {usuario.activo === 1
                                        ? "Activo"
                                        : "Inactivo"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Usuarios;