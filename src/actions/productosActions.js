import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,

    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

// Axios
import clienteAxios from '../config/axios';

// crear un nuevo producto - Función principal

export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch( nuevoProducto() );

        // Insertar en la API
        clienteAxios.post('/productos', producto)
            .then(res => {
                // console.log(res);
                // Si se inserta correctamente
                dispatch( agregarProductoExito(producto) );
            })
            .catch(error => {
                console.log(error);
                dispatch( agregarProductoError(error) );
            })

    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
});

// Obtener lista de productos (Consultando API)
export function obtenerProductosAction() {
    return (dispatch) => {
        dispatch( obtenerProductosComienzo() );

        // Consultar la API
        clienteAxios.get('/productos')
            .then(res => {
                console.log(res);
                dispatch( descargaProductosExitosa(res.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(descargaProductosError());
            })
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
})

export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
})

export const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})

// Función que elimina un producto en específico
export function borrarProductoAction( id ) {
    return (dispatch) => {
        dispatch( obtenerProductoEliminar() );

        // Eliminar en la API
        clienteAxios.delete(`/productos/${id}`)
            .then(res => {
                // console.log(res);
                dispatch( eliminarProductoExito(id) );// Eliminamos del State
            })
            .catch(error => {
                // console.log(error);
            })
    }
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
})

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})

// Obtener el producto a Editar
export function obtenerProductoEditarAction(id) {
    return (dispatch) => {
        dispatch( obtenerProductoAction() );

        // Obtener producto de la API
        clienteAxios.get(`/productos/${id}`)
            .then(res => {
                console.log(res.data);
                dispatch( obtenerProductoEditarExito(res.data) );
            })
            .catch(error => {
                console.log(error);
                dispatch( obtenerProductoEditarError() )
            })
    }
}

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
})

export const obtenerProductoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

export const obtenerProductoEditarError = () =>({
    type: PRODUCTO_EDITAR_ERROR
})

// Modifica un producto en la API y el state
export function editarProductoAction( producto ) {
    return (dispatch) => {
        dispatch(comenzarEdicionProducto())

        // Consultar la API
        clienteAxios.put(`/productos/${producto.id}`, producto)
        .then(res => {
            // console.log(res);
            dispatch(editarProductoExito(res.data));
        }) 
        .catch(error => {
            // console.log(error);
            dispatch( editarProductoError() );
        })
    }
}

export const comenzarEdicionProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

export const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

export const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
})