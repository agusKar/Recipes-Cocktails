import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const RecetasContext = createContext();


const RecetasProvider = (props) => {
    const [ recetas, guardarRecetas ] = useState([]);

    const [ busqueda, buscarRecetas ] = useState({
        ingrediente: '',
        categoria: ''
    });

    const [consultar, guardarConsultar] = useState(false);

    useEffect(() => {
        if(consultar){

            const obtenerRecetas = async () => {
                
                const {ingrediente, categoria} = busqueda;
                const urlAPI = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
                
                const resultadoAPI = await axios.get(urlAPI);
                
                guardarRecetas(resultadoAPI.data.drinks);

            };
            obtenerRecetas();
        }
    }, [busqueda]);
    
    return ( 
        <RecetasContext.Provider
        value={{
            recetas,
            buscarRecetas,
            guardarConsultar
        }}>
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;