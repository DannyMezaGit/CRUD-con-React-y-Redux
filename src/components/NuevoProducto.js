import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions';

    const NuevoProductos = () => {

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);


    // utilizar useDispatch y te crea una función
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector( state => state.productos);
    const error = useSelector( state => state.productos.error);
    console.log(cargando);
    

    // mandar llamar el action de productoAction
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // Validar Form
        if(nombre.trim() === '' || precio <= 0)
        return;
        // Qué hacer si no hay error

        //Crear el producto
        agregarProducto({
            nombre,
            precio
        });
    }


    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form 
                            onSubmit={submitNuevoProducto}
                            
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"  
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Precio Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Precio Producto"   
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProductos;