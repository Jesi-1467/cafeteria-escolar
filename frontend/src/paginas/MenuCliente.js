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

        const cantidadEnCarrito = carrito.filter(
            item => item.id_producto === producto.id_producto
        ).length;

        if (cantidadEnCarrito >= producto.stock) {
            alert(`Ya no hay más existencias de "${producto.nombre}"`);
            return;
        }

        const nuevoCarrito = [...carrito, producto];

        setCarrito(nuevoCarrito);

        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

        const restantes = producto.stock - (cantidadEnCarrito + 1);

        if (restantes === 0) {
            alert(`Se agotó el producto "${producto.nombre}"`);
        } else {
            alert(
                `El producto "${producto.nombre}" se agregó al carrito. Restan ${restantes} unidades`
            );
        }
    };

    const eliminarProducto = (index) => {

        const nuevoCarrito = carrito.filter((_, i) => i !== index);

        setCarrito(nuevoCarrito);

        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    };

    const pagar = async () => {

        const total = carrito.reduce(
            (suma, producto) =>
                suma + parseFloat(producto.precio || 0),
            0
        );

        try {

            const usuario = JSON.parse(localStorage.getItem("usuario"));

            if (!usuario) {
                alert("Debe iniciar sesión");
                return;
            }

            const fechaActual = new Date()
                .toISOString()
                .slice(0, 19);

            const pedidoResponse = await API.post("pedidos/", {
                id_usuario: usuario.id_usuario,
                fecha: fechaActual,
                total: total,
                estado: "Pagado",
                observaciones: "Pedido realizado desde la web"
            });

            const idPedido = pedidoResponse.data.id_pedido;

            const productosAgrupados = {};

            carrito.forEach((producto) => {

                if (!productosAgrupados[producto.id_producto]) {
                    productosAgrupados[producto.id_producto] = {
                        ...producto,
                        cantidad: 1
                    };
                } else {
                    productosAgrupados[producto.id_producto].cantidad++;
                }

            });

            for (const id in productosAgrupados) {

                const producto = productosAgrupados[id];

                if (producto.cantidad > producto.stock) {
                    alert(`No hay suficiente stock de ${producto.nombre}`);
                    return;
                }

            }

            for (const id in productosAgrupados) {

                const producto = productosAgrupados[id];

                await API.post("detallepedidos/", {
                    id_pedido: idPedido,
                    id_producto: producto.id_producto,
                    cantidad: producto.cantidad,
                    precio_unitario: producto.precio,
                    subtotal: producto.cantidad * Number(producto.precio)
                });

                await API.put(`productos/${producto.id_producto}/`, {
                    ...producto,
                    stock: producto.stock - producto.cantidad
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
        (suma, producto) =>
            suma + parseFloat(producto.precio || 0),
        0
    );

    return (
        <>
            <NavbarCliente />

            <div className="container mt-4">

                <h2>Menú de Productos</h2>

                <div className="row">

                    {productos.map((producto) => (

                        <div className="col-md-4 mb-3" key={producto.id_producto}>

                            <div className="card h-100">

                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="card-img-top"
                                    height="200"
                                    style={{ objectFit: "cover" }}
                                />

                                <div className="card-body">

                                    <h5>{producto.nombre}</h5>
                                    <p>${Number(producto.precio).toFixed(2)}</p>
                                    <p>Stock: {producto.stock}</p>

                                    <button
                                        className="btn btn-success"
                                        disabled={producto.stock <= 0}
                                        onClick={() => agregarAlCarrito(producto)}
                                    >
                                        {producto.stock <= 0 ? "Agotado" : "Agregar"}
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