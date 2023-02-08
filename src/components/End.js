import React,{useEffect} from 'react'


export default function End(){
    useEffect(()=>{
        sessionStorage.setItem("fatherName", "")
        sessionStorage.setItem("fatherFamily", "")
        sessionStorage.setItem("fatherTz", "")
        sessionStorage.setItem("fatherBirth", "")
        sessionStorage.setItem("FatherGender", "")
        sessionStorage.setItem("fatherHealth", "")
        sessionStorage.setItem("childrenFather", 0)
    },[])
    return(
        <h2>תודה על המענה!</h2>
    )
}