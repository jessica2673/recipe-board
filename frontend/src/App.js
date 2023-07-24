import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

// components
import Nav from './components/partials/nav';
import Footer from './components/partials/footer';
// import Header from './components/partials/header';

import About from './components/recipe/about';
import CreateRecipe from './components/recipe/createRecipe';
import Home from './components/recipe/home';
import UpdateRecipe from './components/recipe/updateRecipe';
import Details from './components/recipe/details';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/api" element={<Home />}/>
          <Route element={<Footer />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;