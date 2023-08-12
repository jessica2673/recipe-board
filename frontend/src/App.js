import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Nav from './components/partials/nav';
import Footer from './components/partials/footer';
// import Header from './components/partials/header';
import axios from 'axios'
import { LoginSuccess } from './components/LoginSucess';

import About from './components/recipe/about';
import CreateRecipe from './components/recipe/createRecipe';
import Home from './components/recipe/home';

import { useAuthContext } from './hooks/useAuthContext';
import Login from './components/login';
import ErrorPage from './components/error';

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <BrowserRouter>
        <Nav user={user}/>
        <Routes>
          <Route path="/api" element={<Home />}/>
          <Route path="/api/about" element={<About />}/>
          <Route path="/api/create" element={<CreateRecipe />} />
          <Route path="/auth/login" element={<Login />} />
          <Route exact path="/login/success" element={<LoginSuccess />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;