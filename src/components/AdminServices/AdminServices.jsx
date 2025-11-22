import React from 'react';
import { Link } from 'react-router-dom';

function AdminServices() {
  return (
    <div className="container mt-5">
      <h2>Admin Services</h2>
      <div className="list-group">
        <Link className="list-group-item list-group-item-action" to="/pedidos">Administrar Pedidos</Link>
        <Link className="list-group-item list-group-item-action" to="/mozos">Administrar Mozos</Link>
        <Link className="list-group-item list-group-item-action" to="/mesas">Administrar Mesas</Link>
        <Link className="list-group-item list-group-item-action" to="/items">Administrar Items</Link>
        <Link className="list-group-item list-group-item-action" to="/categorias">Administrar Categorías</Link>
      </div>
    </div>
  );
}

export default AdminServices;
