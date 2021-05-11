import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// Crear el context
export const CategoriasContext = createContext();

// Provider es donde se encuentras las funciones y el state

const CategoriasProvider = (props) => {
    // State
    const [categorias, guardarCategorias] = useState([]);

    // Ejecutar llamado a la API
    useEffect(() => {
        const obtenerCategorias = async () => {
            const urlAPI = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

            const categorias = await axios.get(urlAPI);

            guardarCategorias(categorias.data.drinks);

        }
        obtenerCategorias();
    }, [])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}
export default CategoriasProvider;