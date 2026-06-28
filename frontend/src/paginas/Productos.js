import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarAdmin from "../componentes/NavbarAdmin";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
        id_categoria: "",
        activo: 1
    });

    const [productoEditar, setProductoEditar] = useState(null);

    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const cargarProductos = async () => {
        try {
            const response = await API.get("productos/");
            setProductos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const response = await API.get("categorias/");
            setCategorias(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const guardarProducto = async () => {
        try {

            await API.post("productos/", nuevoProducto);

            alert("Producto agregado exitosamente");

            cargarProductos();

            setNuevoProducto({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                imagen: "",
                id_categoria: "",
                activo: 1
            });

        } catch (error) {
            console.error(error);
            alert("Error al agregar el producto");
        }
    };

    const abrirModalEditar = (producto) => {
        setProductoEditar({ ...producto });
    };

    const actualizarProducto = async () => {

        try {

            await API.put(
                `productos/${productoEditar.id_producto}/`,
                productoEditar
            );

            alert("Producto actualizado correctamente");

            cargarProductos();

        } catch (error) {

            console.error(error);
            alert("Error al actualizar el producto");

        }
    };

    const eliminarProducto = async (id) => {

        const confirmacion = window.confirm(
            "¿Estás seguro de eliminar este producto?"
        );

        if (!confirmacion) return;

        try {

            await API.delete(`productos/${id}/`);

            cargarProductos();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>

            <NavbarAdmin />

            <div className="container mt-4">

                <h2>Administración de Productos</h2>

                <hr />

                <button
                    className="btn btn-success mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAgregarProducto"
                >
                    Agregar Producto
                </button>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {productos.map((producto) => (

                            <tr key={producto.id_producto}>

                                <td>{producto.id_producto}</td>

                                <td>
                                    {producto.imagen ? (
                                        <img
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            width="80"
                                            height="80"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    ) : (
                                        "Sin imagen"
                                    )}
                                </td>

                                <td>{producto.nombre}</td>

                                <td>{producto.descripcion}</td>

                                <td>${producto.precio}</td>

                                <td>{producto.stock}</td>

                                <td>{producto.id_categoria}</td>

                                <td>
                                    {producto.activo === 1 ? (
                                        <span className="badge bg-success">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="badge bg-danger">
                                            Inactivo
                                        </span>
                                    )}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditarProducto"
                                        onClick={() => abrirModalEditar(producto)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            eliminarProducto(producto.id_producto)
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* MODAL AGREGAR */}

            <div
                className="modal fade"
                id="modalAgregarProducto"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header bg-success text-white">

                            <h5 className="modal-title">
                                Producto Nuevo
                            </h5>

                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label">Nombre</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={nuevoProducto.nombre}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            nombre: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Descripción
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={nuevoProducto.descripcion}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            descripcion: e.target.value
                                        })
                                    }
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Precio</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={nuevoProducto.precio}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            precio: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Stock</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={nuevoProducto.stock}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            stock: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={nuevoProducto.imagen}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            imagen: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Categoría
                                </label>

                                <select
                                    className="form-control"
                                    value={nuevoProducto.id_categoria}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoProducto,
                                            id_categoria: parseInt(e.target.value)
                                        })
                                    }
                                >

                                    <option value="">
                                        Seleccione una categoría
                                    </option>

                                    {categorias.map((categoria) => (

                                        <option
                                            key={categoria.id_categoria}
                                            value={categoria.id_categoria}
                                        >
                                            {categoria.nombre}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={guardarProducto}
                            >
                                Guardar Producto
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* MODAL EDITAR */}

            <div
                className="modal fade"
                id="modalEditarProducto"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header bg-warning">

                            <h5 className="modal-title">
                                Editar Producto
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            {productoEditar && (

                                <>
                                    <div className="mb-3">
                                        <label>Nombre</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={productoEditar.nombre}
                                            onChange={(e) =>
                                                setProductoEditar({
                                                    ...productoEditar,
                                                    nombre: e.target.value
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Descripción</label>

                                        <textarea
                                            className="form-control"
                                            value={productoEditar.descripcion}
                                            onChange={(e) =>
                                                setProductoEditar({
                                                    ...productoEditar,
                                                    descripcion: e.target.value
                                                })
                                            }
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label>Precio</label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={productoEditar.precio}
                                            onChange={(e) =>
                                                setProductoEditar({
                                                    ...productoEditar,
                                                    precio: e.target.value
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Stock</label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={productoEditar.stock}
                                            onChange={(e) =>
                                                setProductoEditar({
                                                    ...productoEditar,
                                                    stock: e.target.value
                                                })
                                            }
                                        />
                                    </div>
                                </>
                            )}

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={actualizarProducto}
                            >
                                Actualizar
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Productos;