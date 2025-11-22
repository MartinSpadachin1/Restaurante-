import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TablaCategorias from './TablaCategorias/TablaCategorias';
import categoriasService from '../../../../../services/categorias.services';

export default function ConsultarCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
      fetchCategorias();
    }, []);

    const fetchCategorias= async () => {
      try {
        const response = await categoriasService.getAllCategorias();
        setCategorias(response);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

   // ---------------------------------------------------------------------------------
    // Esta es la parte del filtro de categorias
    const fetchFilteredCategorias = async (filterText) => {
      try {
        const response = await categoriasService.getCategoriasByFilter(filterText);
        setCategorias(response);
      } catch (error) {
        console.error('Error fetching filtered categorias:', error);
      }
    };
  
    const handleSearchChange = (e) => {
      const { value } = e.target;
      setSearchText(value);
      if (value) {
        fetchFilteredCategorias(value);
      } else {
        fetchCategorias();
      }
    };

// ---------------------------------------------------------------------------------





    return (
        <div>
          <div className="container mt-5">
            <h2>Gestión de Categorias</h2>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
              <Link className="btn btn-primary me-md-2" to="/crear-categorias">Crear Categoria</Link>
              <Link to="/categorias" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left"></i> Volver
                    </Link>
            </div>
            <p>Seleccione una acción para gestionar las Categorias.</p>
    
{/* -------------------------------------------------------------------------------------     */}
            <div className="mt-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por nombre"
                value={searchText}
                onChange={handleSearchChange}
              />
{/* -------------------------------------------------------------------------------------     */}
            
              <h3>Listado de Categorias</h3>
              <TablaCategorias categorias={categorias} fetchCategorias={fetchCategorias} /> {/* Pasar fetchCateforias como prop */}
            </div>
          </div>
        </div>
      );
    }
