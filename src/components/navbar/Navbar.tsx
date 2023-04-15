import React from 'react';
import './Navbar.scss';
import NavbarSmartButton from './NavbarSmartButton';


function Navbar() {

    return (
        <div id="navbar">
            <img id='company-icon' alt='bitByBit' src='/bitByBitLogo.png'/>
            <NavbarSmartButton path='/' pathName='Home'/>
            <NavbarSmartButton path='/books' pathName='Books'/>
            <NavbarSmartButton path='/books/add' pathName='Add Book'/>
        </div>
    )
}

export default Navbar