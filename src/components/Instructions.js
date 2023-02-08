import React, { useEffect } from "react";

export default function Instructions() {
    let name = sessionStorage.getItem("fatherName")
    
    return (<div>

        <p>שלום {name}</p>
        <h3>דף הוראות לטופס</h3>
        <p>1. יש להזין את פרטיך האישיים בטופס</p>
        <br />
        <p>2. שדות הטופס הינן שדות חובה!</p>
        <br />
        <p>3. שם פרטי ומשפחה יכיל לפחות 2 אותיות</p>
        <br />
        <p>4. ת.ז צריכה להיות בעלת 9 ספרות</p>
    </div>)
}