import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types';
import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';

export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
            // Insertar en la BD
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) )

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {

            // Si hay un error
            dispatch(agregarProductoError(true))

            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'hubo un error',
                text: 'Hubo un error, intenta de nuevo'
                
            });
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

// Función que descarga los productos de la BD
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})