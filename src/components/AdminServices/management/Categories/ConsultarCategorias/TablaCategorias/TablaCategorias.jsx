import React from "react";
import { Link } from "react-router-dom";
import categoriaService from "../../../../../../services/categorias.services";
export default function TablaCategorias({ categorias, fetchCategorias }) {
  const handleDelete = async (categoriaId) => {
    try {
      await categoriaService.deleteCategoriaPorId({ idCat: categoriaId });
      fetchCategorias(); // Actualizar la lista de mozos después de la eliminación
      alert("Mozo eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el mozo:", error);
      alert(
        "Error al eliminar el mozo. Consulte la consola para más detalles."
      );
    }
  };
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.idCat}>
              <td>{categoria.idCat}</td>
              <td>{categoria.nombre}</td>
              <td>
                <div className="d-flex">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(categoria.idCat)}
                  >
                    Eliminar
                  </button>
                  <Link
                    className="btn btn-warning me-2"
                    to={`/actualizar-categorias/${categoria.idCat}`}
                  >
                    Actualizar
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
