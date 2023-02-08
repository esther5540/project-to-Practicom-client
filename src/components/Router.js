import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Instructions from './Instructions'
import Form from './Form';
import ChildrenContext from './ChildrenContext';
import End from './End';
export default function Router() {
    return (
        <div>


           

            <Routes>
                <Route path='/' element={<ChildrenContext><Form /></ChildrenContext>} />
                <Route path='/Instructions' element={<Instructions />} />
                <Route path='/End' element={<End/>}/>

            </Routes>
        </div>
    )
}