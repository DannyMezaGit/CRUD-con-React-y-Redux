import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR


} from '../types';

export function crearNuevoProductoAction(producto){
    return (dispatch) => {
        dispatch( agregarProducto() );

        try {
            dispatch( agregarProductoExito(producto) )
        } catch (error) {
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
const agregarProductoError = () => ({
    
})