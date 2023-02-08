import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ChildrenForm from "./ChildrenForm";
import FatherContext from "./FatherContext";
import ChildrenContext from "./ChildrenContext";
import { fatherContext } from "./FatherContext";
import { childrenContext } from "./ChildrenContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Form() {

    const [isSubmit, setIsSubmit] = useState(false);
    const [sumChildren, setSumChildren] = useState([])
    const [isChildren, setIsChildren] = useState(false)
    const [d, setD] = useState([])
    const childrenCtx = useContext(childrenContext)
    const navigate = useNavigate()

    const onsubmit = (dataForm) => {
        sessionStorage.setItem("fatherName", dataForm.firstName)
        sessionStorage.setItem("fatherFamily", dataForm.lastName)
        sessionStorage.setItem("fatherTz", dataForm.TZ)
        sessionStorage.setItem("fatherBirth", dataForm.birthday)
        sessionStorage.setItem("FatherGender", dataForm.gender)
        sessionStorage.setItem("fatherHealth", dataForm.health)
        sessionStorage.setItem("childrenFather", dataForm.Children)
        console.log(dataForm);
        setIsSubmit(true)

        axios.get(`https://localhost:44387/api/Users/${dataForm.TZ}`).then((data) => {
            d.push(data.data)
            console.log(d)
            console.log(d[0].fatherTz)
            if (data.data != '') {
                axios.put(`https://localhost:44387/api/Users/${dataForm.TZ}`, {
                    FirstName: dataForm.firstName,
                    SecondName: dataForm.lastName,
                    Tz: dataForm.TZ,
                    Birthday: dataForm.birthday,
                    Gender: dataForm.gender,
                    healthFund: dataForm.health,
                    Children: dataForm.children,
                    FatherTz: d[0].fatherTz,
                    MotherTz: d[0].motherTz,
                    UserId: d[0].userId
                })
            }
            else {
                axios.post(`https://localhost:44387/api/Users`, {
                    FirstName: dataForm.firstName,
                    SecondName: dataForm.lastName,
                    Tz: dataForm.TZ,
                    Birthday: dataForm.birthday,
                    Gender: dataForm.gender,
                    healthFund: dataForm.health,
                    Children: dataForm.children,
                    FatherTz: "",
                    MotherTz: ""
                })
            }
        })
        if (dataForm.children > 0) {
            setIsChildren(true)
            for (let index = 0; index < dataForm.children; index++) {
                sumChildren.push(index)
                childrenCtx.childrenData.push({ FirstName: "", SecondName: "", Tz: "", Birthday: "", Gender: "", healthFund: "", Children: "", FatherTz: "", MotherTz: "" })
            }
        }
        else {
            navigate(`/End`)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (<>
        <button onClick={() => { navigate(`/Instructions`) }}>לדף ההוראות</button>
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className="col-md-6">
                <label className="form-label">שם פרטי</label>
                <input defaultValue={sessionStorage.getItem("fatherName")} className="form-control" type="text" {...register("firstName", { required: "לפחות 2 תווים", minLength: 2 })}
                    onChange={(e) => { sessionStorage.setItem("fatherName", e.target.value) }} />
                {errors?.firstName && <p> {errors.firstName.message}</p>}
            </div>

            <div className="col-md-6"></div>
            <label className="form-label">שם משפחה</label>
            <input defaultValue={sessionStorage.getItem("fatherFamily")} className="form-control" type="text" {...register("lastName", { required: "לפחות 2 תווים", minLength: 2 })}
                onChange={(e) => { sessionStorage.setItem("fatherFamily", e.target.value) }} />
            {errors?.lastName && <p> {errors.lastName.message}</p>}
            <div />

            <div className="col-md-6"></div>
            <label className="form-label">ת.ז</label>
            <input defaultValue={sessionStorage.getItem("fatherTz")} className="form-control" type="text" {...register("TZ", { required: "יש להזין 9 תוים", minLength: 9, maxLength: 9 })}
                onChange={(e) => { sessionStorage.setItem("fatherTz", e.target.value) }} />
            {errors?.TZ && <p>{errors.TZ.message}</p>}
            <div />

            <div className="row mb-6"></div>
            <label className="form-label">תאריך לידה</label>
            <input defaultValue={sessionStorage.getItem("fatherBirth")} className="form-control" type="date" {...register("birthday", { required: true })}
                onChange={(e) => { sessionStorage.setItem("fatherBirth", e.target.value) }} />
            <div />

            <div className="row mb-6"></div>
            <label className="form-label">מין</label>
            <select className="form-select" {...register("gender")}>
                <option>זכר</option>
                <option>נקבה</option>
            </select>
            <div />

            <div className="row mb-6"></div>
            <label className="form-label">קופת חולים</label>
            <select className="form-select" {...register("health")}>
                <option>מכבי</option>
                <option>מאוחדת</option>
                <option>לאומי</option>
                <option>כללית</option>
            </select>
            <div />

            <div className="row mb-6"></div>
            <label className="form-label">מס' ילדים</label>
            <input defaultValue={sessionStorage.getItem("childrenFather")} className="form-control" type="number" {...register("children", { required: true })}
                onChange={(e) => { sessionStorage.setItem("childrenFather", e.target.value) }} />
            <div />

            <input className="btn btn-primary" type="submit" />

        </form>
        {

            isSubmit && isChildren &&
            <FatherContext><ChildrenForm children={sumChildren} /></FatherContext>
        }
    </>)
}