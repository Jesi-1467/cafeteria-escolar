import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarCliente from "../componentes/NavbarCliente";

function MenuCliente() {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        cargarProductos();

        const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    const cargarProductos = async () => {
        try {
            const response = await API.get("productos/");
            setProductos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const agregarAlCarrito = (producto) => {

        const cantidad = carrito.filter(
            item => item.id_producto === producto.id_producto
        ).length;

        if (cantidad >= producto.stock) {
            alert("Sin stock disponible");
            return;
        }

        const nuevo = [...carrito, producto];

        setCarrito(nuevo);
        localStorage.setItem("carrito", JSON.stringify(nuevo));
    };

    const eliminarProducto = (index) => {
        const nuevo = carrito.filter((_, i) => i !== index);
        setCarrito(nuevo);
        localStorage.setItem("carrito", JSON.stringify(nuevo));
    };

    const pagar = async () => {

        const total = carrito.reduce(
            (suma, p) => suma + parseFloat(p.precio || 0),
            0
        );

        try {

            const usuario = JSON.parse(localStorage.getItem("usuario"));

            if (!usuario) {
                alert("Debe iniciar sesión");
                return;
            }

            const fecha = new Date().toISOString().slice(0, 19);

            const pedido = await API.post("pedidos/", {
                id_usuario: usuario.id_usuario,
                fecha,
                total,
                estado: "Pagado",
                observaciones: "Compra web"
            });

            const idPedido = pedido.data.id_pedido;

            const agrupados = {};

            carrito.forEach(p => {
                if (!agrupados[p.id_producto]) {
                    agrupados[p.id_producto] = { ...p, cantidad: 1 };
                } else {
                    agrupados[p.id_producto].cantidad++;
                }
            });

            for (const id in agrupados) {
                const p = agrupados[id];

                await API.post("detallepedidos/", {
                    id_pedido: idPedido,
                    id_producto: p.id_producto,
                    cantidad: p.cantidad,
                    precio_unitario: p.precio,
                    subtotal: p.cantidad * Number(p.precio)
                });

                await API.put(`productos/${p.id_producto}/`, {
                    ...p,
                    stock: p.stock - p.cantidad
                });
            }

            alert("Compra realizada correctamente");

            setCarrito([]);
            localStorage.removeItem("carrito");
            cargarProductos();

        } catch (error) {
            console.error(error);
            alert("Error en la compra");
        }
    };

    const total = carrito.reduce(
        (s, p) => s + parseFloat(p.precio || 0),
        0
    );

    return (
        <>
            <NavbarCliente />

            <div className="container mt-4">

                <h2>Menú de Productos</h2>

                <div className="row">

                    {productos.map(p => (
                        <div className="col-md-4 mb-3" key={p.id_producto}>
                            <div className="card">

                                <img src={p.imagen} className="card-img-top" height="200" />

                                <div className="card-body">

                                    <h5>{p.nombre}</h5>
                                    <p>${Number(p.precio).toFixed(2)}</p>
                                    <p>Stock: {p.stock}</p>

                                    <button
                                        className="btn btn-success"
                                        disabled={p.stock <= 0}
                                        onClick={() => agregarAlCarrito(p)}
                                    >
                                        {p.stock <= 0 ? "Agotado" : "Agregar"}
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <hr />

                <h3>Carrito</h3>

                <ul className="list-group">
                    {carrito.map((p, i) => (
                        <li key={i} className="list-group-item d-flex justify-content-between">
                            {p.nombre} - ${p.precio}

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => eliminarProducto(i)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>

                <h4 className="mt-3">Total: ${total.toFixed(2)}</h4>

                {carrito.length > 0 && (
                    <button className="btn btn-primary mt-2" onClick={pagar}>
                        Pagar
                    </button>
                )}

            </div>
        </>
    );
}

export default MenuCliente;