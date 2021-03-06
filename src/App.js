import React, { useState } from "react"
import { Routes, Route } from "react-router-dom";
import Private from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Profiili from "./pages/Profiili";
import Todolist from "./pages/Todolist";
import Signup from './pages/Signup';
import Login from './pages/Login';
import { AuthContext } from "./context/Auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import logoImg from "./img/logo.png";
import gardenImg from "./img/pexels-garden.jpg";
import axios from "axios";
const closeUrl = '/logout'
function App(props) {
  //const existingTokens = JSON.parse(localStorage.getItem("tokens") || '');
  //const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens") || ''));
  const [authTokens, setAuthTokens] = useState(sessionStorage.getItem('tokens'));
  
  const setTokens = (data) => {
    console.log('setTokens:',data)
    /* Huom. logout kutsuu setTokens-funktiota ilman dataa,
       jolloin authTokens-alkuarvoksi tulisi merkkijono 'undefined'. 
       Tässä removeItem tuottaa authTokens-alkuarvoksi null,
       jolloin sen boolean arvo on oikein false. */
    if (data) sessionStorage.setItem("tokens", data);
    else {
      axios.get(closeUrl);
      sessionStorage.removeItem("tokens");
      }
    setAuthTokens(data);
    }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      {console.log("Provider,authTokens:",authTokens)}
      <Navbar/>
      <div className="container">
       <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/admin" element={<Private><Admin/></Private>}/>
          <Route path="/profiili" element={<Private><Profiili/></Private>}/>
          <Route path="/todolist" element={<Private><Todolist/></Private>}/>
        </Routes>
      </div>
      <Footer/>
      </AuthContext.Provider>
  );
}

export default App;