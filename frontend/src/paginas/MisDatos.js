import NavbarCliente from "../componentes/NavbarCliente";

function MisDatos() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return (
        <>
            <NavbarCliente />

            <div className="container mt-4">

                <h2>Mis Datos</h2>

                <table className="table table-bordered table-striped mt-3">

                    <thead className="table-dark">
                        <tr>
                            <th>Campo</th>
                            <th>Información</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>ID</td>
                            <td>{usuario?.id_usuario}</td>
                        </tr>

                        <tr>
                            <td>Nombre</td>
                            <td>{usuario?.nombre}</td>
                        </tr>

                        <tr>
                            <td>Correo</td>
                            <td>{usuario?.email}</td>
                        </tr>

                        <tr>
                            <td>Rol</td>
                            <td>{usuario?.id_rol}</td>
                        </tr>

                        <tr>
                            <td>Activo</td>
                            <td>
                                {usuario?.activo === 1 ? "Sí" : "No"}
                            </td>
                        </tr>

                        <tr>
                            <td>Fecha de Registro</td>
                            <td>{usuario?.fecha_registro}</td>
                        </tr>

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default MisDatos;