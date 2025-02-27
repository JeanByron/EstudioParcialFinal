import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingUser, setEditingUser] = useState(null); // Estado para almacenar el usuario a editar

  // Función para guardar un nuevo usuario
  const guardar = () => {
    const newUser = {
      pepito: name,
      correo: email,
      contrasenia: password,
    };

    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  // Función para guardar cambios de un usuario editado
  const guardarEdicion = () => {
    const updatedUser = {
      pepito: name,
      correo: email,
      contrasenia: password,
    };

    fetch(`http://localhost:8000/api/users/${editingUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Usuario actualizado', data);
        setEditingUser(null); // Limpiar el estado de edición
        resetForm(); // Limpiar los campos del formulario
      })
      .catch((err) => console.log(err));
  };

  // Función para restablecer los campos del formulario
  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  // Esta función se usa para cargar los datos del usuario cuando queremos editarlo
  const editarUsuario = (user) => {
    setEditingUser(user);
    setName(user.pepito);
    setEmail(user.correo);
    setPassword(user.contrasenia);
  };

  return (
    <div className='container'>
      <label htmlFor="name">Ingrese el nombre:</label>
      <input
        type="text"
        id="name"
        className='form-control'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email">Ingrese el correo:</label>
      <input
        type="email"
        id='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Ingrese la contraseña:</label>
      <input
        className='form-control'
        placeholder='Ingrese la contraseña del producto'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className='btn btn-primary mt-3'
        onClick={editingUser ? guardarEdicion : guardar} // Condición para decidir si guardar o editar
      >
        {editingUser ? 'Guardar cambios' : 'Guardar'}
      </button>

      {/* Si hay un usuario que estamos editando, podemos mostrar un mensaje */}
      {editingUser && (
        <div className="alert alert-info mt-3">
          Estás editando al usuario: {editingUser.pepito}
        </div>
      )}
    </div>
  );
}

export default Form;
