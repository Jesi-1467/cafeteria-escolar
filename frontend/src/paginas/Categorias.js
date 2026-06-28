import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import NavbarAdmin from "../componentes/NavbarAdmin";

function Categorias() {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const response = await API.get("categorias/");
            setCategorias(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <NavbarAdmin />

            <div className="container mt-4">

                <div className="d-flex justify-content-between mb-3">

                    <h2>Lista de Categorías</h2>

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
                            <th>Descripción</th>
                            <th>Activo</th>
                        </tr>

                    </thead>

                    <tbody>

                        {categorias.map((categoria) => (

                            <tr key={categoria.id_categoria}>

                                <td>{categoria.id_categoria}</td>

                                <td>{categoria.nombre}</td>

                                <td>{categoria.descripcion}</td>

                                <td>
                                    {categoria.activo === 1
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

export default Categorias;