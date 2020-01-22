import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR


} from '../types';

import clienteAxios from '../config/axios';

export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
            // Insertar en la BD
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) )
        } catch (error) {

            // Si hay un error
            dispatch(agregarProductoError(true))
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
});

// Si el producto se guarda en la BD
const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})