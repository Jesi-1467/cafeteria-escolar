import NavbarCliente from "../componentes/NavbarCliente";

function Cliente() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    return (
        <>
            <NavbarCliente />

            <div className="container mt-4">

                <h1 className="fw-bold mb-4">
                    Panel Cliente
                </h1>

                <hr />

                <h3>
                    Bienvenido {usuario?.nombre}
                </h3>

            </div>
        </>
    );
}

export default Cliente;