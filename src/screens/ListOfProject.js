import React from "react";
import "../Theme/css/list.css";

import Header from "../Components/header";
import Footer from "../Components/footer";

export default function List() {
  return (
    <div>
      <Header />
      <div id="services" className="cardsList">
        <div className="container ">
          <div className="row">
            <div className="col-lg-12">
              <h2>Realisez vos projects de facon collaborative !</h2>
              {/* <p class="p-heading p-large">We serve small and medium sized companies in all tech related industries with high quality growth services which are presented below</p> */}
            </div>{" "}
            {/* end of col */}
          </div>
        </div>
        <div className="container-fluid">
          {/* end of row */}
          <div className="row">
            <div className="col-lg-7">
              <hr style={{ border: "3px solid #e8d7c9" }} />
            </div>
            <div className="col-lg-5" />
          </div>
        </div>
      </div>
      {/* Services */}
      <div
        id="services"
        className="cardsList"
        style={{ paddingBottom: "10rem" }}
      >
        <div className="container ">
          {/* end of row */}
          <div className="row ">
            <div className="col-lg-2" />
            <div className="col-lg-2 " id="selectbox">
              <select class="form-control" id="sel1">
                <option>Categories</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="col-lg-2 " id="selectbox2">
              <select class="form-control" id="sel1">
                <option>Domaine</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="col-lg-3" id="selectbox3">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lieu du project"
                  />
                </div>
              </form>
            </div>
            <div className="col-lg-3" />
            {/* end of col */}
          </div>
          {/* row 1 */}
          <div className="row" id="search2">
            <div className="col-lg-3 ">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
          <div className="row" id="search2">
            <div className="col-lg-3 ">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
          <div className="row" id="search2">
            <div className="col-lg-3 ">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 " id="card1">
              <div className="card">
                <img
                  className="card-image"
                  src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                  alt="alternative"
                />
                <div className="card-body mb-1">
                  <span className="row ml-2">
                    <img
                      id="ImageSmall"
                      src="images/aefa0b8fbb9463895a3d34f90bf6888ad4d7774a.png"
                      alt="alternative"
                    />
                    <h6 className="card-title ml-3">Project Name</h6>
                  </span>
                  <p>Lorem ipsum, or lipsum as it is sometimes known,</p>
                  <div className="w-100  ml-2 " id="iconRow">
                    <span>
                      <i className="fas fa-heart" />
                      <span className="ml-2 " id="span2">
                        21
                      </span>
                    </span>
                    <span id="second">
                      <i className="far fa-circle" />
                      <span className="ml-2 " id="span2">
                        21%
                      </span>
                    </span>
                  </div>
                  {/* <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p> */}
                </div>
              </div>
            </div>
          </div>
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
      </div>{" "}
      {/* end of cardsList */}
      {/* end of services */}
      {/* Details 1 */}
      {/* end of basic-1 */}
      {/* end of details 1 */}
      {/* Details 2 */}
      {/* end of basic-2 */}
      {/* end of details 2 */}
      {/* Details Lightboxes */}
      {/* Details Lightbox 1 */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
