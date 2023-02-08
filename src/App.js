import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';


function App() {
  return (
    <div className="App" dir="rtl">
     
     <BrowserRouter>
      <Router/>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
