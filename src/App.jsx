import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar/Navbar';
import AdminServices from './components/AdminServices/AdminServices';
import Pedidos from './components/AdminServices/management/Pedidos/Pedidos';
import Mozos from './components/AdminServices/management/Mozos/Mozos';
import Mesas from './components/AdminServices/management/Mesas/Mesas';
import Items from './components/AdminServices/management/Items/Items';
import Categories from './components/AdminServices/management/Categories/Categories';
import CrearMozos from './components/AdminServices/management/Mozos/CrearMozos/CrearMozos';
import ConsultarMozos from './components/AdminServices/management/Mozos/ConsultarMozos/ConsultarMozos';
import ActualizarMozos from './components/AdminServices/management/Mozos/ActualizarMozos/ActualizarMozos';
import CrearCategorias from './components/AdminServices/management/Categories/CrearCategorias/CrearCategorias';
import ConsultarCategorias from './components/AdminServices/management/Categories/ConsultarCategorias/ConsultarCategorias';
import ActualizarCategoria from './components/AdminServices/management/Categories/ActualizarCategoria/ActualizarCategoria';
import CrearItems from './components/AdminServices/management/Items/CrearItems/CrearItems'
import ConsultarItems from'./components/AdminServices/management/Items/ConsultarItems/ConsultarItems'
import ActualizarItem from './components/AdminServices/management/Items/ActualizarItems/ActualizarItems'
import CrearPedidos from './components/AdminServices/management/Pedidos/CrearPedidos/CrearPedidos';
import ConsultarPedidos from './components/AdminServices/management/Pedidos/ConsultarPedidos/ConsultarPedidos';
import ActualizarPedido from './components/AdminServices/management/Pedidos/ActualizarPedidos/ActualizarPedidos';
import ConsultarDetalles from './components/AdminServices/management/Detalles/ConsultarDetalles/ConsultarDetalles';
import ActualizarDetalle from './components/AdminServices/management/Detalles/ActualizarDetalles/ActualizarDetalles';
import CrearMesa from './components/AdminServices/management/Mesas/CrearMesas/CrearMesas';
import ConsultarMesa from './components/AdminServices/management/Mesas/ConsultarMesas/ConsultarMesas';
import ActualizarMesa from './components/AdminServices/management/Mesas/ActualizarMesas/ActualizarMesas'

import { ModificarPedido } from './components/Principal/ModificarPedido';
import { SelectorMesa } from './components/Principal/SelectorMesa';
import Principal from './components/Principal/Principal';
import CrearRestaurantes from './components/AdminServices/management/Restaurantes/CrearRestaurantes/CrearRestaurantes';
import ConsultarRestaurantes from './components/AdminServices/management/Restaurantes/ConsultarRestaurantes/ConsultarRestaurantes';
import ActualizarRestaurante from './components/AdminServices/management/Restaurantes/ActualizarRestaurantes/ActualizarRestaurantes';
import Restaurantes from './components/AdminServices/management/Restaurantes/Restaurantes';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/administrar" element={<AdminServices />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/mozos" element={<Mozos />} />
            <Route path="/mesas" element={<Mesas />} />
            <Route path="/items" element={<Items />} /> 
            <Route path="/categorias" element={<Categories />} />
            <Route path="/restaurantes" element={<Restaurantes />} />

            <Route path="/" element={<Principal />} /> 

            <Route path="/crear-mozos" element={<CrearMozos />} /> {/* Ruta para CrearMozos */}
            <Route path="/consultar-mozos" element={<ConsultarMozos />} /> {/* Ruta para ConsultarMozos si existe */}
            <Route path="/actualizar-mozo/:idMozo" element={<ActualizarMozos />} /> {/* Ruta para ActualizarMozos si existe */}

            <Route path="/crear-categorias" element={<CrearCategorias />} /> {/* Ruta para CrearCategorias */}
            <Route path="/consultar-categorias" element={<ConsultarCategorias />} /> {/* Ruta para ConsultarCategorias si existe */}
            <Route path="/actualizar-categorias/:idCat" element={<ActualizarCategoria />} /> {/* Ruta para ConsultarCategorias si existe */}

            <Route path="/crear-items" element={<CrearItems />} /> {/* Ruta para CrearCategorias */}
            <Route path="/consultar-items" element={<ConsultarItems/>} /> {/* Ruta para ConsultarCategorias si existe */}
            <Route path="/actualizar-items/:idItem" element={<ActualizarItem />} /> {/* Ruta para ConsultarCategorias si existe */}

            <Route path="/crear-pedidos" element={<CrearPedidos />} /> 
            <Route path="/consultar-pedidos" element={<ConsultarPedidos/>} /> 
            <Route path="/actualizar-pedidos/:codigo" element={<ActualizarPedido />} />

            <Route path="/modificar-pedidos/:codigo" element={<ModificarPedido />} />

            <Route path="/consultar-detalles/:codigo" element={<ConsultarDetalles/>} />
            <Route path="/actualizar-detalles/:idPedido/:idItem" element={<ActualizarDetalle />} />

            <Route path="/crear-mesas" element={<CrearMesa />} /> {/* Ruta para CrearMesas */}
            <Route path="/consultar-mesas" element={<ConsultarMesa/>} /> {/* Ruta para ConsultarMesas si existe */}
            <Route path="/actualizar-mesa/:nmesa/:idResto" element={<ActualizarMesa />} /> {/* Ruta para ActualizarMesa si existe */}
            <Route path="/consultar-mesas/resto/:idResto" element={<SelectorMesa/>} />
           
          
            <Route path="/crear-restaurantes" element={<CrearRestaurantes />} />
            <Route path="/consultar-restaurantes" element={<ConsultarRestaurantes/>} />
            <Route path="/actualizar-restaurantes/:idResto" element={<ActualizarRestaurante />} />
          </Routes>
        </div>
      </div>
    </Router>
   );
}

export default App;
