import React from 'react';
import { useDispatch, useSelector} from 'react-redux';

const EditarProducto = () => {


    // Producto a editar
    const producto = useSelector( state => state.productos.productoEditar)
    
    if (!producto) return null;
    const {nombre, precio, id } = producto;

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form action="">
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"  
                                    name="nombre"
                                    value={nombre}
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
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Actualizar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;