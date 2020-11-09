import React from 'react'
import '../Theme/css/profile.css'
import Header from '../Components/header'
import Footer from '../Components/footer'

export default function Profile(){
    return(
        <div>
   <Header/>
      
        <div id="services" className="cardSection">
          <div className="container ">
            <div className="row">
              <div style={{width: '50%'}}>
                <h4 >Ne soyez plus seul pour realiser vos projects, soyez entoures des meilleurs !</h4>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div> 
              <div style={{width: '50%'}}>
                <p className="mt-1 ml-3" >Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div>{/* end of col */}
            </div> {/* end of row */}
            {/* end of row */}
          </div> {/* end of container */}
        </div> {/* end of cardSection */}
        {/* end of services */}
        <div id="services" className="cardSection">
          <div className="container ">
            <div className="row pt-4" style={{background: '#fcfcfc'}}>
              <div className="col-lg-1 text-center">
                <span>
                  <img src="images/facebook.png" style={{width: '25px', height: '25px'}} />
                </span>
                <div className="mt-4">
                  <img src="images/instagram.png" style={{width: '25px', height: '25px'}} />
                </div>
                <div className="mt-4">
                  <img src="images/youtube.png" style={{width: '25px', height: '25px'}} />
                </div>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div> 
              <div className="col-lg-2  text-left">
                <div className="card">
                  <img className="card-image" src="images/2ec3fab78d6bb56ad5ea7980d9013f7e3b39cdf3.png" alt="alternative" />
                </div>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div> 
              <div className="col-lg-9  text-left">
                <div>
                  <h5>Franco Prefumo</h5>
                  <hr style={{border: '2px solid #c4bec2'}} />
                </div>
                <p className="mt-2">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
                {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
              </div> 
              {/* end of col */}
            </div>
            <div className="row " style={{marginTop: '2rem'}}>
              <div className="col-lg-6">
                <p style={{marginLeft: '6rem'}}>
                  <i className="fas fa-map-marker-alt fa-lg" />
                  <span className="ml-3">Paris</span>
                </p>
              </div>
              <div className="col-lg-6">
                <p>
                  <i className="fas fa-search fa-lg" />
                  <span className="ml-3">Interet pour : asoociatiff , e-commerce, construction</span>
                </p>
              </div>
            </div>
            <div className="row" style={{marginTop: '2rem'}}>
              <div className="col-lg-1" />
              <div className="col-lg-11 text-left  p-1" style={{background: '#fcfcfc', margin: 'auto', position: 'relative'}}>
                <h3 className="mt-1 ml-3">PROFIL</h3>
              </div>
            </div>
            <div className="row text-left" style={{marginLeft: '5rem', marginTop: '2rem'}}>
              <div className="col-lg-6">
                <p><i className="fas fa-phone-volume fa-lg " style={{color: '#0d2456'}} />
                  <span className="ml-2">06.45.30.12.31</span>
                </p>
                <p style={{marginTop: '1.5rem'}}><i className="fas fa-camera fa-lg " style={{color: '#0d2456'}} />
                  <span className="ml-2">Franco@gmail.com</span>
                </p>
                <p style={{marginTop: '1.5rem'}}><i className="fas fa-shopping-basket fa-lg " />
                  <span className="ml-2">Sable, Beton, Granulat</span>
                </p>
              </div>
              <div className="col-lg-6" style={{marginTop: '-0.8rem'}}>
                <div className=" ml-2 " id="iconRow">
                  <p>
                    <small>Informatique - </small>
                    Developer Front End <br />
                    <span>
                      <i className="fas fa-star fa-sm fa-sm" style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                    </span> 
                  </p>
                  <p style={{marginRight: '8rem'}}>
                    <i className="fas fa-heart text-danger" />
                    {/* <span class="ml-2 " id="span2" >21%</span> */}
                  </p>
                </div>
                <div className=" ml-2  " id="iconRow" style={{marginTop: '-0.3rem'}}>
                  <p>
                    <small>Informatique - </small>
                    Developer Front End
                    <br />
                    <span>
                      <i className="fas fa-star fa-sm fa-sm" style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " />
                      <i className="fas fa-star fa-sm " />
                    </span> 
                  </p>
                  <p style={{marginRight: '8rem'}}>
                    <i className="fas fa-heart " />
                    {/* <span class="ml-2 " id="span2" >21%</span> */}
                  </p>
                </div>
                <div className=" ml-2 " id="iconRow" style={{marginTop: '-0.3rem'}}>
                  <p>
                    <small>Informatique - </small>
                    Developer Front End <br />
                    <span>
                      <i className="fas fa-star fa-sm fa-sm" style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " style={{color: '#ffe500'}} />
                      <i className="fas fa-star fa-sm " />
                    </span> 
                  </p>
                  <p style={{marginRight: '8rem'}}>
                    <i className="fas fa-heart " />
                    {/* <span class="ml-2 " id="span2" >21%</span> */}
                  </p>
                </div>
              </div>
            </div>
            <div className="row " style={{marginTop: '2rem'}}>
              <div className="col-lg-1" />
              <div className="col-lg-11 text-left  p-1" style={{background: '#fcfcfc', margin: 'auto', position: 'relative'}}>
                <h4 className="mt-1 ml-2">PROJECTS</h4>
              </div>
            </div>
            <div className="row text-left" style={{marginTop: '2rem'}} id="projectPage">
              <div className=" text-right" style={{width: '20%'}}>
                <img className="project-image" src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png" alt="alternative" />
              </div>
              <div className="text-left" style={{width: '50%'}}>
                <div style={{marginLeft: '2rem'}}>
                  <p>E-Commerce</p>
                  <h6 style={{marginTop: '-0.7rem'}}>Creation d'un site e-commerce</h6>
                  <small>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                  </small></div>
              </div>
              <div className="  text-center" style={{width: '30%'}}>
                <i className="fas fa-circle fa-lg " style={{color: '#4B8B0B'}} />
                <button type="button" className="btn btn-block">Voir Plus</button>
              </div>
            </div>
            <div className="col-lg-11 text-right" style={{marginLeft: '1rem'}}>
              <i className="fas fa-heart fa-lg " />
            </div>
            <div className="row text-left" style={{marginTop: '2rem'}} id="projectPage">
              <div className=" text-right" style={{width: '20%'}}>
                <img className="project-image" src="images/305b7327ab645935e179307a21247d89232a242a.png" alt="alternative" />
              </div>
              <div className="text-left" style={{width: '50%'}}>
                <div style={{marginLeft: '2rem'}}>
                  <p>E-Commerce</p>
                  <h6 style={{marginTop: '-0.7rem'}}>Creation d'un site e-commerce</h6>
                  <small>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                  </small></div>
              </div>
              <div className="  text-center" style={{width: '30%'}}>
                <i className="fas fa-circle fa-lg" />
                <button type="button" className="btn btn-block">Voir Plus</button>
              </div>
            </div>
            <div className="col-lg-11 text-right" style={{marginLeft: '1rem'}}>
              <i className="fas fa-heart fa-lg " />
            </div>
            <div className="row text-left" style={{marginTop: '2rem'}} id="projectPage">
              <div className=" text-right" style={{width: '20%'}}>
                <img className="project-image" src="images/89dadc1055d5a03f7cc45e7dc36030fb11d6f236.png" alt="alternative" />
              </div>
              <div className="text-left" style={{width: '50%'}}>
                <div style={{marginLeft: '2rem'}}>
                  <p>E-Commerce</p>
                  <h6 style={{marginTop: '-0.7rem'}}>Creation d'un site e-commerce</h6>
                  <small>
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                  </small></div>
              </div>
              <div className="  text-center" style={{width: '30%'}}>
                <i className="fas fa-circle fa-lg" />
                <button type="button" className="btn btn-block">Voir Plus</button>
              </div>
            </div>
            <div className="col-lg-11 text-right" style={{marginLeft: '1rem'}}>
              <i className="fas fa-heart fa-lg " />
            </div>
            {/* end of row */}
            {/* end of row */}
            <div className="row" style={{marginTop: '2rem'}}>
              <div className="col-lg-1" />
              <div className="col-lg-11 text-left  p-1" style={{background: '#fcfcfc', margin: 'auto', position: 'relative'}}>
                <h4 className="mt-1 ml-2">COMMENTAIRIES</h4>
              </div>
            </div>
            <div className="row text-left" style={{marginTop: '2rem'}} >
              <div className="text-right" style={{width: '15%'}}>
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
                  <textarea name id cols={110} rows={3} placeholder="  Add a coment" defaultValue={""} />
                </div>
                <div style={{width: '10%'}} className="text-center">
                  <button type="button" className="btn btn-block mt-4" style={{maxWidth: '80%'}}>Send</button>
                </div>  
              </div>
            </div>
          </div>
          {/* end of row */}
        </div> {/* end of container */}
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