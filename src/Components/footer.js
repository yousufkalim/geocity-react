import React from "react";

function footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12">
              <div className="footer-col">
                <h4>GEOCITY</h4>
                <p>
                  We're passionate about offering some of the best business
                  growth services for startups
                </p>
              </div>
            </div>{" "}
            {/* end of col */}
            <div className="col-md-8 col-lg-6 col-sm-12">
              <div className="footer-col middle">
                {/* <h4>Important Links</h4> */}
                <div className="row mt-1">
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                  </ul>
                  <ul className="list-unstyled li-space-lg " id="list">
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                  </ul>
                  <ul className="list-unstyled li-space-lg " id="list">
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                    <li className="media">
                      {/* <i class="fas fa-square"></i> */}
                      <div className="media-body">Lorem Ipsum </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>{" "}
            {/* end of col */}
            <div className=" col-lg-2 col-sm-12">
              <div className="footer-col last">
                {/* <h4>Social Media</h4> */}
                <span className="fa-stack" style={{ marginRight: "0.7rem" }}>
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-facebook-f fa-stack-1x" />
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x" />
                    <i className="fab fa-twitter fa-stack-1x" />
                  </a>
                </span>
              </div>
            </div>{" "}
            {/* end of col */}
          </div>{" "}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <p className="tilt-footer-para">
                {" "}
                &copy; {new Date().getFullYear()}{" "}
                <a target="blank" href="https://falconconsulting.fr/">
                  <span
                    style={{ color: "dodgerblue", textDecoration: "underline" }}
                  >
                    Falcon Consulting
                  </span>
                </a>
                , made with love for a better web
              </p>
            </div>
          </div>
          {/* end of row */}
        </div>{" "}
        {/* end of container */}
      </div>{" "}
      {/* end of footer */}
    </>
  );
}

export default footer;
