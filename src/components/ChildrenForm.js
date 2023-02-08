import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { childrenContext } from "./ChildrenContext";
import { fatherContext } from "./FatherContext";
import { useNavigate } from "react-router-dom";

export default function ChildrenForm(props) {
    const sumChildren = props.children
    const[d,setD]=useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const childrenCtx = useContext(childrenContext)
    const navigate = useNavigate()
   

    const onSubmitChildren = (dataForm) => {
        childrenCtx.childrenData.map((x, index) => {
            <div>
                {axios.get(`https://localhost:44387/api/Users/${x.Tz}`).then(data => {
                     d.push(data.data)
                     var Ftz=''; var Mtz='';
                     Ftz=d[0].fatherTz
                     if(Ftz==''){
                         Ftz=x.FatherTz
                         Mtz=d[0].motherTz
                     }
                     else{
                         Mtz=x.MotherTz
                     }
                    if (data.data == '') {

                        axios.post(`https://localhost:44387/api/Users`, {
                            FirstName: x.FirstName,
                            SecondName: x.SecondName,
                            Tz: x.Tz,
                            Birthday: x.Birthday,
                            Gender: x.Gender,
                            healthFund: x.healthFund,
                            Children: x.Children,
                            FatherTz: x.FatherTz,
                            MotherTz: x.MotherTz
                        })
                    }
                    else {
                        axios.put(`https://localhost:44387/api/Users/${x.Tz}`, {
                            FirstName: x.FirstName,
                            SecondName: x.SecondName,
                            Tz: x.Tz,
                            Birthday: x.Birthday,
                            Gender: x.Gender,
                            healthFund: x.healthFund,
                            Children: x.Children,
                            FatherTz: Ftz,
                            MotherTz: Mtz,
                            UserId: d[0].userId
                        })
                    }
                })}
            </div>
        })
        navigate(`/End`)
    }

    return (
        <>
            <p>מלא פרטי ילדיך</p>

            <form onSubmit={handleSubmit(onSubmitChildren)} className="row g-3">
                {
                    sumChildren.map((x, index) => <div key={index}>
                        <div className="col-md-6">
                            <label className="form-label">שם פרטי</label>
                            <input className="form-control" type="text" {...register(`firstName${x}`, { required: "לפחות 2 תווים", minLength: 2 })}
                                onChange={(e) => {
                                    let newArr = [...childrenCtx.childrenData]
                                    let item = { ...newArr[x] }
                                    item.FirstName = e.target.value
                                    item.SecondName = sessionStorage.getItem("fatherFamily")
                                    item.healthFund = sessionStorage.getItem("fatherHealth")
                                    item.Children = 0
                                    if (sessionStorage.getItem("FatherGender") == "זכר") {
                                        item.FatherTz = sessionStorage.getItem("fatherTz")
                                        item.MotherTz = ""
                                        newArr[x] = item
                                        childrenCtx.setChildrenData(newArr)
                                    }
                                    else {
                                        item.FatherTz = ""
                                        item.MotherTz = sessionStorage.getItem("fatherTz")
                                        newArr[x] = item
                                        childrenCtx.setChildrenData(newArr)
                                    }
                                }} />
                            {errors?.firstName && <p> {errors.firstName.message}</p>}
                        </div>

                        <div className="col-md-6"></div>
                        <label className="form-label">ת.ז</label>
                        <input className="form-control" type="text" {...register(`TZ${x}`, { required: "יש להזין 9 תוים", minLength: 9, maxLength: 9 })}
                            onChange={(e) => {
                                let newArr = [...childrenCtx.childrenData]
                                let item = { ...newArr[x] }
                                item.Tz = e.target.value
                                newArr[x] = item
                                childrenCtx.setChildrenData(newArr)
                            }} />
                        {errors?.TZ && <p>{errors.TZ.message}</p>}
                        <div />

                        <div className="row mb-6"></div>
                        <label className="form-label">תאריך לידה</label>
                        <input className="form-control" type="date" {...register(`birthday${x}`, { required: true })}
                            onChange={(e) => {
                                let newArr = [...childrenCtx.childrenData]
                                let item = { ...newArr[x] }
                                item.Birthday = e.target.value
                                newArr[x] = item
                                childrenCtx.setChildrenData(newArr)
                            }} />
                        <div />

                        <div className="row mb-6"></div>
                        <label className="form-label">מין</label>
                        <select className="form-select" {...register(`gender${x}`)} onChange={(e) => {
                            let newArr = [...childrenCtx.childrenData]
                            let item = { ...newArr[x] }
                            item.Gender = e.target.value
                            newArr[x] = item
                            childrenCtx.setChildrenData(newArr)
                        }} >
                            <option>זכר</option>
                            <option>נקבה</option>
                        </select >
                        <div />

                        <br />
                    </div>)
                }
                <input className="btn btn-primary" type="submit" />
            </form>


        </>
    )
}
