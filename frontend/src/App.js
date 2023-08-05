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
  const [user, setUser] = useState(null)
  console.log('here')
  useEffect(() => {
      const fetchUser = async () => {
          const response = await fetch('/profile/extra')
          const json = await response.json()
          console.log(json);
          if (response.ok) {
              setUser(json)
          }
      }

      fetchUser()
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Nav user={user}/>
        <Routes>
          <Route path="/api" element={<Home />}/>
          <Route path="/api/about" element={<About />}/>
          <Route path="/api/create" element={<CreateRecipe />} />
          <Route path="/api/create" element={<CreateRecipe />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;