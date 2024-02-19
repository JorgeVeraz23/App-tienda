import React, {useState} from 'react';
import styled from 'styled-components';
import {NavLink, Routes, Route} from 'react-router-dom'
import Inicio from './componentes/inicio';
import Blog from './componentes/Blog';
import Tienda from './componentes/Tienda';
import Error404 from './componentes/Error404';
import Carrito from './componentes/Carrito';

const App = () => {
    const productos = [
        {id: 1, nombre: 'Producto 1'},
        {id: 2, nombre: 'Producto 2'},
        {id: 3, nombre: 'Producto 3'},
        {id: 4, nombre: 'Producto 4'}
    ];
    const [carrito, cambiarCarrito] = useState([]);
    const agregarProductoAlCarrito = (idProdutoAAgregar, nombre) => {
        //si el carrito no tiene elementos entonces agregamos uno.
        if(carrito.length === 0){
            cambiarCarrito([{id: idProdutoAAgregar, nombre: nombre, cantidad: 1}]);
        } else {
            //de otra forma tenemos que revisar que el carrito no tenga ya el producto que queremos agregar
            //si ya lo tiene entonces queremos actualizar su valor 
            //si no tiene el producto entonces lo agregamos 

            //Para poder editar el arreglo tenemos que clonarlo
            const nuevoCarrito = [...carrito];
            //Comprobamos si el carrito ya tiene el ID del producto a agregar
            const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
                return productoDeCarrito.id === idProdutoAAgregar
            }).length > 0;
            //Si ya tiene el producto entonces lo tenemos que actualizar. 
            if(yaEstaEnCarrito){
                //Para ello tenemos que buscarlo, obtener su pocision en el arreglo.
                //y en base a su pocision ya actualizamos el valor
                nuevoCarrito.forEach((productoDeCarrito, index) => {
                    if(productoDeCarrito.id === idProdutoAAgregar){
                        const cantidad = nuevoCarrito[index].cantidad;
                        nuevoCarrito[index] = {id: idProdutoAAgregar, nombre: nombre, cantidad: cantidad +1}
                    }
                });
            } else {
                nuevoCarrito.push(
                    {
                        id: idProdutoAAgregar,
                        nombre: nombre,
                        cantidad: 1
                    }
                );
            }
            //Por ultimo actualizamos el carrito
            cambiarCarrito(nuevoCarrito);
        }
    }


  return (
    <Contenedor>
        <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
        </Menu>
        <main>
        <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path='/' exact={true} element={<Inicio/>}/>
            <Route path='/blog' element={<Blog />} />
            <Route path='/tienda' element={<Tienda 
            productos={productos}
            agregarProductoAlCarrito={agregarProductoAlCarrito}
            />}/>
            
        </Routes>
    </main>
    <aside>
            <Carrito carrito={carrito}/>
        </aside>
    </Contenedor>
    

  );
}

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;

export default App;