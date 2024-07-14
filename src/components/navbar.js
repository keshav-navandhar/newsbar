import React, { Component } from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';
const Navbar = (props) => {
    return (
        <>
            <nav className='main-nav'>
                <div className='main-nav-head'>
                    <h1>{props.title}</h1>
                </div>
                <div className='links'>
                    <ul>
                        <Link to="/home">Home</Link>
                        <Link to="/business" >Business</Link>
                        <Link to="/entertainment">Entertainment</Link>
                        <Link to="/health">Health</Link>
                        <Link to="/science">Science</Link>
                        <Link to="/sports">Sports</Link>
                        <Link to="/technology">Technology</Link>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar;