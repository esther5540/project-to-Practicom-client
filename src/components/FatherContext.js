import React, { createContext, useEffect, useState } from "react";
import ChildrenContext from "./ChildrenContext";

export const fatherContext = createContext();

export default function FatherContext(props) {
    const [fatherData, setFatherData] = useState()
    useEffect(() => {
        setFatherData({})
    }, [])

    return (
        <fatherContext.Provider value={{ fatherData, setFatherData }}>
            {props.children}
        </fatherContext.Provider>
    );
}