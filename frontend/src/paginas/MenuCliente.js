import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarCliente from "../componentes/NavbarCliente";

function MenuCliente() {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        cargarProductos();

        const carritoGuardado =
            localStorage.getItem("carrito");

        if (carritoGuardado) {
            setCarrito(
                JSON.parse(carritoGuardado)
            );
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

        const nuevoCarrito = [
            ...carrito,
            producto
        ];

        setCarrito(nuevoCarrito);

        localStorage.setItem(
            "carrito",
            JSON.stringify(nuevoCarrito)
        );

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

        const nuevoCarrito = carrito.filter(
            (_, i) => i !== index
        );

        setCarrito(nuevoCarrito);

        localStorage.setItem(
            "carrito",
            JSON.stringify(nuevoCarrito)
        );
    };

    const pagar = async () => {

        try {

            const usuario = JSON.parse(
                localStorage.getItem("usuario")
            );

            if (!usuario) {

                alert("Debe iniciar sesión");
                return;

            }

            const fechaActual = new Date()
                .toLocaleString("sv-SE")
                .replace(" ", "T");

            const pedidoResponse = await API.post(
                "pedidos/",
                {
                    id_usuario: usuario.id_usuario,
                    fecha: fechaActual,
                    total: total,
                    estado: "Pagado",
                    observaciones: "Pedido realizado desde la web"
                }
            );

            const idPedido =
                pedidoResponse.data.id_pedido;

            const productosAgrupados = {};

            carrito.forEach((producto) => {

                if (!productosAgrupados[producto.id_producto]) {

                    productosAgrupados[
                        producto.id_producto
                    ] = {
                        ...producto,
                        cantidad: 1
                    };

                } else {

                    productosAgrupados[
                        producto.id_producto
                    ].cantidad++;

                }

            });

            for (const id in productosAgrupados) {

                const producto =
                    productosAgrupados[id];

                if (
                    producto.cantidad >
                    producto.stock
                ) {

                    alert(
                        `No hay suficiente stock de ${producto.nombre}`
                    );

                    return;

                }

            }

            for (const id in productosAgrupados) {

                const producto =
                    productosAgrupados[id];

                await API.post(
                    "detallepedidos/",
                    {
                        id_pedido: idPedido,
                        id_producto:
                            producto.id_producto,
                        cantidad:
                            producto.cantidad,
                        precio_unitario:
                            producto.precio,
                        subtotal:
                            producto.cantidad *
                            Number(producto.precio)
                    }
                );

                const productoActualizado = {
                    ...producto,
                    stock:
                        producto.stock -
                        producto.cantidad
                };

                await API.put(
                    `productos/${producto.id_producto}/`,
                    productoActualizado
                );

            }

            alert(
                "Compra realizada correctamente"
            );

            setCarrito([]);

            localStorage.removeItem("carrito");

            cargarProductos();

        } catch (error) {

            console.error(error);

            alert(
                "Error al realizar la compra"
            );

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

                <h2 className="mb-4">
                    Menú de Productos
                </h2>

                <div className="row">

                    {productos.map((producto) => (

                        <div
                            className="col-md-4 mb-4"
                            key={producto.id_producto}
                        >

                            <div className="card h-100">

                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="card-img-top"
                                    height="200"
                                    style={{ objectFit: "cover" }}
                                />

                                <div className="card-body">

                                    <h5>
                                        {producto.nombre}
                                    </h5>

                                    <p>
                                        <strong>Precio:</strong>{" "}
                                        ${Number(producto.precio).toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>Stock:</strong>{" "}
                                        {producto.stock}
                                    </p>

                                    <button
                                        className="btn btn-success"
                                        disabled={producto.stock <= 0}
                                        onClick={() =>
                                            agregarAlCarrito(producto)
                                        }
                                    >
                                        {producto.stock <= 0
                                            ? "Agotado"
                                            : "Agregar al carrito"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <hr />

                <h3>
                    Carrito de Compras
                </h3>

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {carrito.length > 0 ? (

                            carrito.map((producto, index) => (

                                <tr key={index}>

                                    <td>{producto.nombre}</td>

                                    <td>
                                        ${Number(producto.precio).toFixed(2)}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                eliminarProducto(index)
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="text-center"
                                >
                                    No hay productos en el carrito
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

                <div className="alert alert-success">

                    <h4>
                        Total a pagar: $
                        {Number(total).toFixed(2)}
                    </h4>

                </div>

                {carrito.length > 0 && (

                    <div className="text-center">

                        <button
                            className="btn btn-primary btn-lg"
                            onClick={pagar}
                        >
                            Pagar
                        </button>

                    </div>

                )}

            </div>
        </>
    );
}

export default MenuCliente;