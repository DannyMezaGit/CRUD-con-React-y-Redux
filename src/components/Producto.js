import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction } from '../actions/productoActions';

const Producto = ({producto}) => {
    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    // Confirmar si desea eliminar
    const confirmarProductoEliminar = id => {

        // Preguntar al usuario
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                // Pasarlo al action
                dispatch( borrarProductoAction(id) );
            }
          });
    }

    // Función que redirige de forma programada
    const redireccionarEdicion = producto => {
        history.push(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td> {nombre} </td>
            <td><span> $ {precio} </span></td>
            <td className="acciones">
                <button 
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick= {() => redireccionarEdicion(producto)}>
                    Editar
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => confirmarProductoEliminar(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Producto;