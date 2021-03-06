import React, { useState } from "react";
import {
  NavBar,
  NavLinks,
  NavLink,
  Logo,
  MenuButton,
} from "./Navbar.style";
import { FaBars,FaTimes } from "react-icons/fa"
import { PrivateLink,PublicLink,LoginCloseButton } from '../PrivateLink'
import logoImg from "../img/logo.png";

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
  
    return (
      <NavBar>
        <Logo src={logoImg}></Logo>
        <NavLinks openMenu={openMenu}>    
            <NavLink to="/"> Home</NavLink>
            <PrivateLink to="/Admin">Admin</PrivateLink>
            <PrivateLink to="/Profiili">Profiili</PrivateLink>
            <PrivateLink to="/Todolist">Todolist</PrivateLink>      
            <LoginCloseButton/>
         </NavLinks>
        {/*<MenuButton onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? <>&#10005;</> : <>&#8801;</>}
        </MenuButton>*/}
      <MenuButton onClick={() => setOpenMenu(!openMenu)}>
      {openMenu ? <FaTimes/> : <FaBars/>}
      </MenuButton>
      </NavBar>
    );
  }
  
export default Navbar;