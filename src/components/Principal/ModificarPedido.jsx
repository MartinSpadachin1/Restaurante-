import React, { useEffect, useState } from 'react';
import categoriasService from '../../services/categorias.services.js';
import itemsService from '../../services/items.services.js';
import detallesService from '../../services/detallesPedidos.services.js'; 
import DetalleCard from './DetalleCard.jsx'; 
import ItemCard from './ItemCard.jsx'; 
import { Link, useParams, useNavigate } from 'react-router-dom';

export const ModificarPedido = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [categoriaItems, setCategoriaItems] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const { codigo } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCategorias();
    fetchDetalles(); 
  }, []);

  useEffect(() => {
    if (categorias.length > 0) {
      handleCategoriaClick(categorias[0]); // Selecciona la primera categoría por defecto
    }
  }, [categorias]);

  const fetchCategorias = async () => {
    const categorias = await categoriasService.getAllCategorias();
    setCategorias(categorias);
  };

  const handleCategoriaClick = async (categoria) => {
    setSelectedCategoria(categoria);
    const items = await itemsService.getItemByCategoria(categoria.idCat);
    setCategoriaItems(items);
  };

  const fetchDetalles = async () => {
    const detalles = await detallesService.getDetallesDePedido(codigo); 
    setDetalles(detalles);
  };
  const handleClick = ()=>{
    navigate(-1)
  }
  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between">
        <h2>Categorias</h2>
        <button onClick={handleClick} className="btn btn-primary">Terminar Modificación</button>
      </div>
      <ul className="list-group list-group-horizontal mt-3">
        {categorias.map((categoria) => (
          <li
            key={categoria.idCat}
            className={`list-group-item ${selectedCategoria && selectedCategoria.idCat === categoria.idCat ? 'active' : ''}`}
            onClick={() => handleCategoriaClick(categoria)}
            style={{ cursor: 'pointer' }}
          >
            {categoria.nombre}
          </li>
        ))}
      </ul>
      {selectedCategoria && (
        <div className="mt-4">
          <h4>Items de {selectedCategoria.nombre}</h4>
          <div className="row">
            {categoriaItems && categoriaItems.map((item) => (
              <ItemCard key={item.idItem} item={item} codigo={codigo} fetchDetalles={fetchDetalles} />
            ))}
          </div>
        </div>
      )}
      <div className="mt-5">
        <h4>Items del Pedido</h4>
        {detalles && detalles.map((detalle) => (
          <DetalleCard key={detalle.idItem} idItem={detalle.idItem} cantidad={detalle.cantidad} />
        ))}
      </div>
    </div>
  );
};
