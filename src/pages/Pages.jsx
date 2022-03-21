import Home from "./Home";
import React from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Cuisine from "./Cuisine";


function Pages() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cuisine/:type" element={<Cuisine/>} />
      </Routes>
  
  )
}

export default Pages