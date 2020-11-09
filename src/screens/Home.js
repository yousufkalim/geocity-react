import React from 'react'
import '../Theme/css/styles.css';
// import './css/fontawesome-all.css'
import Footer from '../Components/footer'

import {  Link
} from "react-router-dom";
function Home() {
  return (
    <div>
        {/* Preloader */}
        {/* <div class="spinner-wrapper">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div> */}
        {/* end of preloader */}
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          {/* Text Logo - Use this if you don't have a graphic logo */}
          {/* <a class="navbar-brand logo-text page-scroll" href="index.html">Evolo</a> */}
          {/* Image Logo */}
          {/* <a class="navbar-brand logo-image" href="index.html">GEOCITY</a> */}
          {/* Mobile Menu Toggle Button */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-awesome fas fa-bars" />
            <span className="navbar-toggler-awesome fas fa-times" />
          </button>
          {/* end of mobile menu toggle button */}
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to='/' className="nav-link page-scroll">
                Home <span className="sr-only">(current)</span>
                </Link>
                {/* <a className="nav-link page-scroll" href="#header">Home <span className="sr-only">(current)</span></a> */}
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#services">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#pricing">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#request">Service</a>
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
                <a className="nav-link page-scroll" href="#contact">Contact Us</a>
              </li> 
            </ul>
            <span className="nav-item" style={{marginLeft: '30px'}}>
              <Link className="btn-outline-sm" to="/SignUp">
              SIGN UP
              </Link>
             
            </span>
            <span className="nav-item" style={{marginLeft: '1rem'}}>
            <Link className="btn-outline-sm" to="/Login">
            LOG IN
            </Link>
            </span>
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
          </div>
        </nav> {/* end of navbar */}
        {/* end of navigation */}
        {/* Header */}
        <header id="header" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="text-container">
                    <h2><span className="turquoise">Vous avez un project ?</span> </h2>
                    <h2><span className="turquoise">Trouvez donc vos collaborateurs !</span> </h2>
                    <p className="p-large">Plateforme vous permettant de trouver vos collaborateurs selon les competences necesseries, et ce pour chaque etape de votre project</p>
                    <a className="btn-solid-lg page-scroll" href="#services">En savoir plus </a>
                  </div> {/* end of text-container */}
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
        {/* end of header */}
        {/* Customers */}
        {/* Services */}
        <div id="services" className="cards-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Comment cela fontctionne</h2>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div> {/* end of col */}
            </div> {/* end of row */}
            <div className="row " id="section1">
              <div className="col-lg-12">
                <h2 className="h2-heading">Pour les porteurs de projet</h2>
                {/* Card */}
                <div className="card">
                  <img className="card-image" src="images/light-bulb.svg" alt="alternative" />
                  <div className="card-body">
                    <h4 className="card-title">Creez votre projet</h4>
                    {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                  </div>
                </div>
                {/* end of card */}
                {/* Card */}
                <div className="card">
                  <img className="card-image" src="images/deal.svg" alt="alternative" />
                  <div className="card-body">
                    <h4 className="card-title">Trouvez vos collaborateurs</h4>
                    {/* <p>Once the market analysis process is completed our staff will search for opportunities that are in reach</p> */}
                  </div>
                </div>
                {/* end of card */}
                {/* Card */}
                <div className="card">
                  <img className="card-image" src="images/rocket.svg" alt="alternative" />
                  <div className="card-body">
                    <h4 className="card-title">Realisez votre projet !</h4>
                    {/* <p>With all the information in place you will be presented with an action plan that your company needs to follow</p> */}
                  </div>
                </div>
                {/* end of card */}
              </div> {/* end of col */}
            </div> 
            <div className="row " id="section2">
              <div className="col-lg-12">
                <h2 className="h2-heading">Pour les personnes recherchant un projet</h2>
                {/* Card */}
                <div className="card">
                  <img className="card-image" src="images/magnifier.svg" alt="alternative" />
                  <div className="card-body">
                    <h4 className="card-title">Recherchez un projet</h4>
                    {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                  </div>
                </div>
                {/* end of card */}
                {/* Card */}
                <div className="card">
                  <img className="card-image" src="images/paper-plane.svg" alt="alternative" />
                  <div className="card-body">
                    <h4 className="card-title">Contactez le porteur du projet</h4>
                    {/* <p>Once the market analysis process is completed our staff will search for opportunities that are in reach</p> */}
                  </div>
                </div>
                {/* end of card */}
                {/* Card */}
                <div className="card">
                  <img className="card-image" src="images/target.svg" alt="alternative" />
                  <div className="card-body">
                    <h4 className="card-title">Apportez votre contribution</h4>
                    {/* <p>With all the information in place you will be presented with an action plan that your company needs to follow</p> */}
                  </div>
                </div>
                {/* end of card */}
              </div> {/* end of col */}
            </div>
            {/* end of row */}
          </div> {/* end of container */}
        </div> {/* end of cards-1 */}
        {/* end of services */}
        {/* Details 1 */}
        {/* end of basic-1 */}
        {/* end of details 1 */}
        {/* Details 2 */}
        <div className="basic-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="image-container">
                  <img className="img-fluid" src="https://img.freepik.com/free-photo/business-man-holding-bright-light-bulb-hand_28629-1091.jpg?size=626&ext=jpg" alt="alternative" />
                </div> {/* end of image-container */}
              </div> {/* end of col */}
              <div className="col-lg-6">
                <div className="text-container">
                  <h2>Lancez-vous maintenant !</h2>
                  <Link to="/list">
                  <p>See the list of projects</p>
                  </Link>
                  <Link to="/Createproject">

                  <p className="mt-5 ">Create a new project</p>
                  </Link>
                </div> {/* end of text-container */}
              </div> {/* end of col */}
            </div> {/* end of row */}
          </div> {/* end of container */}
        </div> {/* end of basic-2 */}
        {/* end of details 2 */}
        {/* Details Lightboxes */}
        {/* Details Lightbox 1 */}
        {/* Footer */}
   <Footer/>
      </div>
  );
}

export default Home;
