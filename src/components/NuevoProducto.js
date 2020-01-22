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

    // mandar llamar el action de productoAction
    const agregarProducto = () => dispatch( crearNuevoProductoAction() );

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        // Validar Form

        // Qué hacer si no hay error

        //Crear el producto
        agregarProducto();
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
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProductos;