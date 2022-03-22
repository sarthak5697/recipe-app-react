import Home from "./Home";
import React from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Recipe from "./Recipe";
import Cuisine from "./Cuisine";
import Searched from "../pages/Searched";


function Pages() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cuisine/:type" element={<Cuisine/>} />
        <Route path="/searched/:search" element={<Searched/>} />
        <Route path="/recipe/:name" element={<Recipe/>} />
      </Routes>
  
  )
}

export default Pages