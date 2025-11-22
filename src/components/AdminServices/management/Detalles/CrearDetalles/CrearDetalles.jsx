import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import detallesService from '../../../../../services/detallesPedidos.services.js';
import itemsService from '../../../../../services/items.services.js';
import categoriasService from '../../../../../services/categorias.services.js';

export default function CrearDetalle() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const {codigo} = useParams();

    useEffect( () => {
        fetchCategorias();
        fetchItems();
    }, []);

    const fetchCategorias = async () => {
        const categorias = await categoriasService.getAllCategorias();
        setCategorias(categorias);
    };

    const fetchItems = async () => {
        const items = await itemsService.getAllItems();
        setItems(items);
    };

    const onSubmit = async (data) => {
        try {
            const response = await detallesService.postNuevoDetalle(data);
            console.log('Nuevo detalle creado:', response);
            alert('Detalle creado exitosamente');
            navigate(`/consultar-detalles/${codigo}`);
            reset();
        } catch (error) {
            console.error('Error al crear el detalle', error);
            alert('Error al crear el detalle. Consulte la consola para más detalles.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Detalle</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button type="submit" className="btn btn-primary me-2">Crear Detalle</button>
                <Link to="/items" className="btn btn-secondary">Volver</Link>
            </form>
            {isLoading && <p>Cargando categorías...</p>}
        </div>
    );
}
