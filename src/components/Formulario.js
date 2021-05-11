import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    // Create state de formulario
    const [ busqueda, guardarBusqueda ] = useState({
        ingrediente: '',
        categoria: ''
    });

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    // Funcion para leer los contenidos
    const obtenerDatosReceta = e =>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <form
            className="col-12"
            onSubmit={e => {
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Buscar por categoria e ingrediente.</legend>
            </fieldset>

            <div className="row">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        name="ingrediente" 
                        id="ingrediente"
                        className="form-control"
                        placeholder="Buscar por ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        name="categoria" 
                        id="categoria"
                        className="form-control"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">Seleccionar categoria</option>
                        {
                            categorias.map(categoria => (
                                <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        type="submit" 
                        value="Buscar"
                        className="btn btn-block btn-primary"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;