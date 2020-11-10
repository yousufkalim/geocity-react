import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
       <>
       <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          {/* Text Logo - Use this if you don't have a graphic logo */}
          {/* <a class="navbar-brand logo-text page-scroll" href="index.html">Evolo</a> */}
          {/* Image Logo */}
          <Link to="/" className="navbar-brand logo-image">
            GEOCITY
          </Link>
          {/* Mobile Menu Toggle Button */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-awesome fas fa-bars" />
            <span className="navbar-toggler-awesome fas fa-times" />
          </button>
          {/* end of mobile menu toggle button */}
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#header">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#services">Loream Ipsum</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#pricing">Loream Ipsum</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#request">Loream Ipsum</a>
              </li>
              {/* Dropdown Menu */}          
              {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle page-scroll" href="#about" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">About</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="terms-conditions.html"><span class="item-text">Terms Conditions</span></a>
                        <div class="dropdown-items-divide-hr"></div>
                        <a class="dropdown-item" href="privacy-policy.html"><span class="item-text">Privacy Policy</span></a>
                    </div>
                </li> */}
              {/* end of dropdown menu */}
              {/* <li class="nav-item">
                    <a class="nav-link page-scroll" href="#contact">Contact Us</a>
                </li>*/}
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#contact">Loream Ipsum</a>
              </li>
            </ul>
            {/* <span class="nav-item" style="
            margin-left: 30px;
        ">
                <a class="btn-outline-sm" href="log-in.html">SIGN UP</a>
              </span>
              <span class="nav-item" style="margin-left: 1rem;">
                <a class="btn-outline-sm" href="log-in.html">LOG IN</a>
              </span> */}
            {/* <span class="nav-item social-icons">
                <span class="fa-stack">
                    <a href="#your-link">
                        <i class="fas fa-circle fa-stack-2x facebook"></i>
                        <i class="fab fa-facebook-f fa-stack-1x"></i>
                    </a>
                </span>
                <span class="fa-stack">
                    <a href="#your-link">
                        <i class="fas fa-circle fa-stack-2x twitter"></i>
                        <i class="fab fa-twitter fa-stack-1x"></i>
                    </a>
                </span>
            </span> */}
            <span id="span" className="nav-item">
              <a className="btn btn-block text-dark" href="log-in.html">Loream Ipsum</a>
            </span>
          </div>
        </nav> {/* end of navbar */}
        {/* end of navigation */}
        {/* Header */}
        <header id="header" className="headerProject">
          <div className="headerProject-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  {/* end of text-container */}
                </div> {/* end of col */}
                <div className="col-lg-4">
                  {/* <div class="image-container">
                            <img class="img-fluid" src="images/header-teamwork.svg" alt="alternative">
                        </div> */}
                </div>
              </div> {/* end of row */}
            </div> {/* end of container */}
          </div> {/* end of header-content */}
        </header> {/* end of header */}
       </>
    )
}

export default Header
