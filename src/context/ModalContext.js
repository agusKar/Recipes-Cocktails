import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// Crear context
export const ModalContext = createContext();

// Crear provider
const ModalProvider = (props) => {

    // Crear state
    const [ idreceta, guardarIdReceta ] = useState(null);
    const [ busquedareceta, guardarBusquedaReceta] = useState({});

    useEffect(() => {
        const buscarIngredientes = async () => {
            if(!idreceta) return;

            const urlAPI = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultadoAPI = await axios.get(urlAPI);

            guardarBusquedaReceta(resultadoAPI.data.drinks[0]);
        };
        buscarIngredientes();
    }, [ idreceta ]);

    return ( 
        <ModalContext.Provider
            value={{
                busquedareceta,
                guardarIdReceta,
                guardarBusquedaReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;