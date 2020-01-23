import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,

    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types';
import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';
import Productos from '../components/Productos';
import EditarProducto from '../components/EditarProducto';

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

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) );
        } catch (error) {
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () =>  ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProuctoExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'Producto eliminado correctamente',
                'success'
            )

        } catch (error) {
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProuctoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edición
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Editar un registro en la API y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto));
        } catch (error) {
            dispatch( editarProductoError() );
        }
    }
}
const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})
const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
    
});
const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})