import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Table() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // Estado para el producto en edición
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    function fetchProducts() {
        fetch('http://localhost:8000/api/users')
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                setProducts(data);
            })
            .catch(function (err) {
                console.log('Error:', err);
            });
    }

    function deleteProducts(id) {
        fetch(`http://localhost:8000/api/users/${id}`, {
            method: 'DELETE'
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                console.log(data);
                fetchProducts();
            })
            .catch(function (err) {
                console.log('Error:', err);
            });
    }

    function handleEdit(product) {
        setEditingProduct(product);
        setNewName(product.name);
        setNewEmail(product.email);
    }

    function handleSave() {
        const updatedProduct = {
            ...editingProduct,
            name: newName,
            email: newEmail,
        };

        fetch(`http://localhost:8000/api/users/${editingProduct.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                console.log('Producto actualizado:', data);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === editingProduct.id ? updatedProduct : product
                    )
                );
                setEditingProduct(null); // Cerrar el formulario de edición
            })
            .catch(function (err) {
                console.log('Error:', err);
            });
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Lista de Usuarios</h2>
            <button className="btn btn-primary mb-3" onClick={fetchProducts}>
                Obtener Usuarios
            </button>
            {editingProduct && (
                <div className="mb-3">
                    <h4>Editar Usuario</h4>
                    <div className="form-group">
                        <label htmlFor="editName">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="editName"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editEmail">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="editEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success" onClick={handleSave}>
                        Guardar Cambios
                    </button>
                    <button
                        className="btn btn-secondary ml-2"
                        onClick={() => setEditingProduct(null)}
                    >
                        Cancelar
                    </button>
                </div>
            )}

            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(function (product) {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.email}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(product)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger ml-2"
                                        onClick={() => deleteProducts(product.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
