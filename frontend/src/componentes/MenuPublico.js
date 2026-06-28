import { useEffect, useState } from "react";
import API from "../api/api";

function MenuPublico(){
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        API.get("/productos/").then((response) => {
            setProductos(response.data);
        });
    }, []);
    return(
        <div className="container mt-5">
            <h2 className="text-center">Menu Escolar</h2>
            <div className="row">
                {productos.map((producto => (
                    <div className="col-md-4" key={producto.id}>
                        <div className="card m-2">
                            <div className="card-body">
                                <h5>{producto.nombre}</h5>
                                <p>{producto.descripcion}</p>
                                <h4>${producto.precio}</h4>
                            </div>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
}
export default MenuPublico;