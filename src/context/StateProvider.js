import { createContext, useContext, useReducer} from "react";




export const StateContext= createContext();

    
export const StateContextProvider = ({children, reducer, initialState}) => {
    return(
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateValue = () => useContext(StateContext);