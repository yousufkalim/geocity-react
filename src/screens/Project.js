import React from 'react'
import '../Theme/css/project.css'
import Header from '../Components/header'
import Footer from '../Components/footer'

export default function Project(){
    return(
        <div>
    
      <Header/>
        <div id="services" className="cardsProject">
          <div className="container ">
            <div className="row ">
              <div className=" text-center" style={{width: '20%', background: '#fcfcfc', height: '15.1rem'}}>
                <div style={{paddingRight: '0rem', paddingTop: '0.6rem', paddingLeft: '0rem'}}>
                  <img className="project-image" src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png" alt="alternative" />
                </div>
              </div>
              <div className="text-left" style={{width: '70%'}}>
                <div style={{background: '#fcfcfc', marginLeft: '2rem', paddingBottom: '0.1rem'}}>
                  <div style={{padding: '2rem', paddingTop: '0.5rem'}}>
                    <p style={{color: '#11CE70', fontWeight: 'bold'}}>Construction</p>
                    <h3 style={{marginTop: '0rem'}}>Creation d'un site e-commerce</h3>
                    <small>
                      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                    </small></div>
                  <p style={{marginLeft: '2rem', marginTop: '1rem'}}>
                    Saint-Martin-en-Brie (87)
                  </p>
                </div>
              </div>
              <div className="  text-right" style={{width: '10%', background: '#fcfcfc', paddingRight: '1rem', height: '15.2rem'}}>
                <button type="button" className="btn btn-block">Voir Plus</button>
                <p style={{marginTop: '0.7rem', marginRight: '2.1rem'}}>
                  <i className="fas fa-heart " />
                  <span style={{marginTop: '-2rem', marginLeft: '0.5rem', fontFamily: 'Arial, Helvetica, sans-serif'}}>32</span>
                  {/* <span class="ml-2 " id="span2" >21%</span> */}
                </p>
                <p style={{marginTop: '8.4rem', marginRight: '1.4rem'}}>
                  <i className="fas fa-circle " />
                  <span style={{marginTop: '-2rem', marginLeft: '0.5rem', fontFamily: 'Arial, Helvetica, sans-serif'}}>32%</span>
                  {/* <span class="ml-2 " id="span2" >21%</span> */}
                </p>
              </div>
            </div>
            <div className="row text-left" style={{marginTop: '1rem', marginLeft: '2rem'}}>
              <div className=" text-right" style={{width: '15%', background: '#fcfcfc'}}>
                <div id="userImage">
                  <img className="proj-img" src="images/8710f827d91a67472cc82eb52f62f665cd38a5ed.png" alt="alternative" />
                </div>
              </div>
              <div className="text-left" style={{width: '20%'}}>
                <div id="userDetail">
                  <h5>Nick Thomas
                  </h5>
                  <p style={{marginTop: '1rem'}}><i className="fas fa-phone-volume fa-lg " style={{color: '#0d2456'}} />
                    <span className="ml-2">06.45.30.12.31</span>
                  </p>
                  <p style={{marginTop: '1rem'}}><i className="fas fa-camera fa-lg " style={{color: '#0d2456'}} />
                    <span className="ml-2">Franco@gmail.com</span>
                  </p>
                </div>
              </div>
              <div className="text-left" style={{width: '65%'}}>
                <div style={{marginLeft: '1rem', marginTop: '1.5rem'}}>
                  <button type="button" id="userButton" className="btn btn-block">Voir le profil</button>
                </div>
              </div>
            </div>
            {/* end of col */}
          </div>
          <div className="row" style={{marginTop: '2rem'}}>
            <div className="col-lg-1" />
            <div className=" col-lg-11 text-left  p-1" style={{margin: 'auto', position: 'relative'}}>
              <div className="row ml-3">
                <h5 className="mt-2 ">ETAPES DE REALISATION</h5>
                <button type="button" id="modifyButton" className="btn  ml-3">MODIFIER</button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row text-left" style={{marginTop: '2rem'}} id="projectPage">
              <div className=" text-left" style={{width: '60%'}}>
                <div style={{marginLeft: '2rem'}}>
                  <p>
                    <i className="fas fa-circle fa-lg mr-3 text-secondary" />
                    REALISATION DES FONDATIONS
                  </p>
                  <div className="row" style={{marginTop: '-0.7rem'}}>
                    <p style={{width: '56%', marginLeft: '3.3rem'}}>
                      <small>
                        Field : Construction Description of the talent of of the material which is requested for this step.  
                      </small></p>
                    <p id="entapeSearch">
                      <i className="fas fa-search fa-lg  text-secondary" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="  text-left" style={{width: '30%'}}>
                <small>Collaborateurs: </small>
                <p>
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                </p>
              </div>
              <div style={{width: '10%'}} />
            </div>
            {/*  */}
            <div className="row text-left" style={{marginTop: '2rem'}} id="projectPage">
              <div className=" text-left" style={{width: '60%'}}>
                <div style={{marginLeft: '2rem'}}>
                  <p>
                    <i className="fas fa-circle fa-lg mr-3 " style={{color: '#4B8B0B'}} />
                    REALISATION DE LA STRUCTURE
                  </p>
                  <div className="row" style={{marginTop: '-0.7rem'}}>
                    <p style={{width: '56%', marginLeft: '3.3rem'}}>
                      <small>
                        Field : Construction Description of the talent of of the material which is requested for this step.  
                      </small></p>
                    <p id="entapeSearch">
                      <i className="fas fa-search fa-lg  text-secondary" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="  text-left" style={{width: '30%'}}>
                <small>Collaborateurs: </small>
                <p>
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                </p>
              </div>
              <div style={{width: '10%'}} />
            </div>
            {/*  */}
            <div className="row text-left" style={{marginTop: '2rem'}} id="projectPage">
              <div className=" text-left" style={{width: '60%'}}>
                <div style={{marginLeft: '2rem'}}>
                  <p>
                    <i className="fas fa-circle fa-lg mr-3 " style={{color: '#000'}} />
                    COULAGE DU DALLAGE
                  </p>
                  <div className="row" style={{marginTop: '-0.7rem'}}>
                    <p style={{width: '56%', marginLeft: '3.3rem'}}>
                      <small>
                        Field : Construction Description of the talent of of the material which is requested for this step.  
                      </small></p>
                    <p id="entapeSearch">
                      <i className="fas fa-search fa-lg  text-secondary" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="  text-left" style={{width: '30%'}}>
                <small>Collaborateurs: </small>
                <p>
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                  <img className="project-image-sm" src="images/e0f09c3889c64c05d65e6813afeeb9000edff9af.png" alt="alternative" />
                </p>
              </div>
              <div style={{width: '10%'}} />
            </div>
          </div>
          {/* end of row */}
          {/* end of row */}
          <div className="row" style={{marginTop: '2rem'}}>
            <div className="col-lg-1" />
            <div className="col-lg-11 text-left  p-1" style={{background: '#fcfcfc', margin: 'auto', position: 'relative'}}>
              <h4 className="mt-1 ml-2">COMMENTAIRIES</h4>
            </div>
          </div>
          <div className="row text-left" style={{marginTop: '2rem'}}>
            <div className=" text-right" style={{width: '15%'}}>
              <img className="com-image" src="images/2ec3fab78d6bb56ad5ea7980d9013f7e3b39cdf3.png" alt="alternative" />
            </div>
            <div className="text-left" style={{width: '85%'}}>
              <div style={{marginLeft: '2rem'}}>
                <h5>Franco Prefumo
                  <small className="ml-2"> 13/03/2020</small>
                </h5>
                <p className="mt-2" style={{fontWeight: 'bold'}}>Lorem ipsum, or lipsum as it is sometimes known, </p>
              </div>
            </div>
          </div>
          <div className="row text-left" style={{marginTop: '2rem'}} >
            <div className=" text-right" style={{width: '15%'}}>
              <img className="com-image" src="images/955f725149c7dca617c33a6ae75ec32bc0f12d5b.png" alt="alternative" />
            </div>
            <div className="text-left" style={{width: '85%'}}>
              <div style={{marginLeft: '2rem'}}>
                <h5>Franco Prefumo
                  <small className="ml-2"> 13/03/2020</small>
                </h5>
                <p className="mt-2 " style={{fontWeight: 'bold'}}>Lorem ipsum, or lipsum as it is sometimes known, </p>
              </div>
            </div>
          </div>
          <div className="container ">
              <div className="row" style={{marginTop: '2rem'}}>
                <div style={{width: '90%'}} className="text-right">
                  <textarea name id cols={110} rows={3} style={{width: '90%'}}  placeholder="  Add a coment" defaultValue={""} />
                </div>
                <div style={{width: '10%'}} className="text-center">
                  <button type="button" className="btn btn-block mt-4" style={{maxWidth: '80%'}}>Send</button>
                </div>  
              </div>
            </div>

        </div>
        {/* end of row */}
        {/* end of container */}
        {/* Details 1 */}
        {/* end of basic-1 */}
        {/* end of details 1 */}
        {/* Details 2 */}
        {/* end of basic-2 */}
        {/* end of details 2 */}
        {/* Details Lightboxes */}
        {/* Details Lightbox 1 */}
        {/* Footer */}
        <Footer/>
      </div>
    )
}