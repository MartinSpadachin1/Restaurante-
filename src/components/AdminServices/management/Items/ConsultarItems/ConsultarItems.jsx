import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TablaItem from './TablaItems/TablaItems';
import itemsService from '../../../../../services/items.services';
import categoriasService from '../../../../../services/categorias.services';

export default function ConsultarItems() {
    const [items, setItems] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');

    useEffect(() => {
        fetchItems();
        fetchCategorias(); // Asegúrate de llamar a fetchCategorias también
    }, []);

    const fetchItems = async () => {
        try {
            const response = await itemsService.getAllItems();
            setItems(response);
        } catch (error) {
            console.error('Error fetching Items:', error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await categoriasService.getAllCategorias();
            setCategorias(response);
        } catch (error) {
            console.error('Error fetching Categories:', error);
        }
    };

    const handleClick = async () => {
        if (selectedCategoria === '') {
            fetchItems();
        } else {
            try {
                console.log('Selected Category:', selectedCategoria);
                const response = await itemsService.getItemByCategoria(selectedCategoria);
                console.log('Items fetched by category:', response);
                setItems(response);
                
            } catch (error) {
                console.error('Error fetching Items by category:', error);
            }
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <h2>Gestión de Items</h2>
                <div className="d-flex justify-content-end mb-4">
                    <Link className="btn btn-primary me-2" to="/crear-items">Crear Item</Link>
                    <Link to="/items" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left"></i> Volver
                    </Link>
                </div>
                <p>Seleccione una acción para gestionar los Items.</p>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Filtrar por Categoría:</label>
                    <select
                        className='form-select'
                        id="categoria"
                        value={selectedCategoria}
                        onChange={(e) => setSelectedCategoria(e.target.value)}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map(categoria => (
                            <option key={categoria.idCat} value={categoria.idCat}>{categoria.nombre}</option>
                        ))}
                    </select>
                    <button className="btn btn-primary mt-2" onClick={handleClick}>Filtrar</button>
                </div>
                <div className="mt-4">
                    <h3>Listado de Items</h3>
                    <TablaItem items={items} fetchItems={fetchItems} />
                </div>
            </div>
        </div>
    );
}
