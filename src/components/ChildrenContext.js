import React, {createContext, useEffect, useState } from "react";

export const childrenContext = createContext();

export default function ChildrenContext(props) {
    const [childrenData, setChildrenData] = useState([])
    useEffect(() => {
        setChildrenData([])
    }, [])

    return(
        <childrenContext.Provider value={{childrenData,setChildrenData}}>
            {props.children}
        </childrenContext.Provider>
    );
}
