import React, { useEffect, useState } from "react";
// import "../Theme/css/list.css";
import axios from "axios";
import Header from "../Components/Header/header";
import Footer from "../Components/footer";
import Autocomplete from "react-autocomplete";
import ProjectList from "../Components/projectList";
import DefaultImage from "../Theme/images/index2.png";
import { isAuthenticated, getUser } from "../Auth/Index";
import { Redirect, withRouter } from "react-router-dom";
import SelectBox from "../shared/select";
import { useToasts } from "react-toast-notifications";
import Loaders from "../shared/Loaders";
import AutoComplete from "../Components/SearchAutoComplete";
import { projectaboutRequired } from "../shared/Data";
import io from "socket.io-client";

function List({ notificationsData, setdata }) {
  const { addToast } = useToasts();
  useEffect(() => {
    window.socket = io(
      process.env.REACT_APP_SOCKET_URL || "http://160.153.249.64:7002",
      {
        query: `userConnectionId=${getUser()._id}`,
      }
    );
    if (window.socket) {
      window.socket.on(`recieveNotification${getUser()._id}`, (datas) => {
        setdata([...notificationsData, datas]);
        console.log(datas, "datas");
        addToast(datas.title, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      });
    }
    // return () => {
    //   io.socket.off();
    // };
  }, []);
  const filterData = {
    category: "",
    skillField: "",
    city: "",
  };
  const [filterFormData, setfilterFormData] = useState(filterData);
  // array || list states********************
  const [projectData, setProjectData] = useState("");
  const [CategoryList, setCategoryList] = useState("");
  const [filteredArray, setfilteredArray] = useState([]);
  const [skillfieldList, setskillFieldList] = useState("");
  const [items, setItems] = useState([]);
  // list states end***********************

  // single states *********************
  const [request, setRequest] = useState(false);
  const [filter, setFilter] = useState(false);
  const [address, setAddress] = useState("");
  const [aboutRequiredFields, setAboutRequiredFields] = useState(
    projectaboutRequired
  );
  // single states end

  // useEffect ************************
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    try {
      axios
        .get("http://localhost:1190/api/v1/auth/skillList")
        .then((res) => {
          const array = [...res.data.skills];
          const tempArray = array.filter((ft) => ft.isDeleted == false);

          const options = tempArray.map((arr, i) => ({
            value: arr._id,
            label: arr.skillField,
          }));
          setskillFieldList(options);
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {}
    try {
      axios
        .get("http://localhost:1190/api/v1/admin/categoryList", headers)
        .then((res) => {
          const array = [...res.data.categories];
          const tempArray = array.filter((ft) => ft.isDeleted == false);
          const options = tempArray.map((arr) => ({
            value: arr._id,
            label: arr.name,
          }));
          setCategoryList(options);
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {}
    try {
      axios
        .get("http://localhost:1190/api/v1/auth/projectList")
        .then((res) => {
          setProjectData(res.data.projects);
          console.log(res, "response project");
        })
        .catch((err) => console.log(" error project =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);
  // useEffect end
  const validateCity = () => {
    // ""
    if (address === "") {
      try {
        axios
          .get("http://localhost:1190/api/v1/auth/projectList")
          .then((res) => {
            setProjectData(res.data.projects);
            console.log(res, "response project");
          })
          .catch((err) => console.log(" error project =>", err));
      } catch (error) {
        // console.log(error, "error catch");
      }
      setFilter(false);
      return false;
    } else {
      const msg = "";
      setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
      return true;
    }
  };
  // request for view ***********************
  const RequestToView = (id) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    if (!isAuthenticated()) {
      setRequest(true);
      addToast("Please login", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1000,
      });
    } else {
      try {
        axios
          .post(
            `http://localhost:1190/api/v1/project/view-project/send-request?id=${id}`,
            {},
            headers
          )
          .then((res) => {
            addToast("You have successfully Send Request to View Project ", {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 1000,
            });
          })
          .catch((err) => {
            if (err.response.data) {
              if (err.response.data.message) {
                addToast(`${err.response.data.message}`, {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 1000,
                });
              } else {
                addToast(`${err.response.data}`, {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 1000,
                });
              }
            }
          });
      } catch (error) {
        console.log(" error request =>", error);
      }
    }
  };
  // handleCategoryChange **************************

  const handleCategoryChange = (e) => {
    if (e === null) {
      // alert("onClose");
      setFilter(false);
      setfilteredArray([]);
      setfilterFormData({ ...filterFormData, ["category"]: "" });
    } else {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      setfilterFormData({ ...filterFormData, ["category"]: e.value });
      try {
        axios
          .post(
            "http://localhost:1190/api/v1/project/search/category",
            { category: e.value },
            headers
          )
          .then((res) => {
            const tempArray = res.data.filter((ft) => ft.isDeleted == false);

            setFilter(true);
            if (res.data.length > 0) {
              setfilteredArray(tempArray);
            }
          })
          .catch((err) => {
            setFilter(false);
          });
      } catch (error) {
        setFilter(false);
      }
    }
  };
  // *********
  // handleFieldChange
  const handleFieldChange = (e) => {
    if (e === null) {
      // alert("onClose");
      setFilter(false);
      setfilteredArray([]);
      setfilterFormData({ ...filterFormData, ["skillField"]: "" });
    } else {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      setfilterFormData({ ...filterFormData, ["skillField"]: e.value });
      try {
        axios
          .post(
            "http://localhost:1190/api/v1/project/search/skill",
            { skill: e.value },
            headers
          )
          .then((res) => {
            setFilter(true);
            const tempArray = res.data.projects.filter(
              (ft) => ft.isDeleted == false
            );

            if (res.data) {
              setfilteredArray(tempArray);
            } else {
              setfilteredArray([]);
            }
          })
          .catch((err) => {
            setFilter(false);
          });
      } catch (error) {
        setFilter(false);
      }
    }
  };
  // getAddress
  const getAddress = (e) => {
    setAddress(e.target.value);

    fetch(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=housenumber&autocomplete=1&limit=10"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var addressToSet = [];
        for (var i = 0; i < responseJson.features.length; i++) {
          addressToSet.push({
            id: i,
            label: responseJson.features[i].properties.label,
            city: responseJson.features[i].properties.city,
            PostalCode: responseJson.features[i].properties.postcode,
            lat: responseJson.features[0].geometry.coordinates[1],
            lng: responseJson.features[0].geometry.coordinates[0],
          });
        }
        if (addressToSet.length === responseJson.features.length) {
          setItems(addressToSet);
        }
      })
      .catch((error) => {});
  };
  // setAdress *********************
  const SetAddress = (item) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    setAddress(item);
    for (let i = 0; i < items.length; i++) {
      if (items[i].label === item) {
        var city = items[i].city;
        var zipCode = items[i].PostalCode;
        var lat = items[i].lat.toString();
        var lng = items[i].lng.toString();

        var newAddress = items[i].label.split(String(zipCode));
      }
    }
    try {
      axios
        .post(
          "http://localhost:1190/api/v1/project/search/city",
          { city: city },
          headers
        )
        .then((res) => {
          setFilter(true);
          // setProjectData(res.data);
          setfilteredArray(res.data.projects);
          // setProjectData(res.data.projects);
          // console.log(res, "response projectcityData");
        })
        .catch((err) => {
          setFilter(false);
          console.log(" error project =>", err);
        });
    } catch (error) {
      setFilter(false);
    }
  };
  // render *************************************
  if (request === false) {
    return (
      <div>
        <Header notificationsData={notificationsData} />
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
            {!isAuthenticated() ? (
              ""
            ) : (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row " id="mainselectBox">
                  <div>
                    <SelectBox
                      name="category"
                      id="category"
                      CategoryList={CategoryList}
                      value={filterFormData.category}
                      placeholder="Catégories"
                      onChange={handleCategoryChange}
                    />
                  </div>
                  <div className="selectBox">
                    <SelectBox
                      name="skillField"
                      id="skillField"
                      placeholder="Domaine"
                      CategoryList={skillfieldList}
                      value={filterFormData.category}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="selectbox3" style={{ position: "relative" }}>
                    <i
                      class="fas fa-search"
                      style={{
                        color: "grey",
                        fontSize: "16px",
                        position: "absolute",
                        left: "13.5rem",
                        // right: 0,
                        top: "0.8rem",
                        display: address == "" ? "block" : "none",
                      }}
                    ></i>
                    <AutoComplete
                      items={items}
                      SetAddress={SetAddress}
                      getAddress={getAddress}
                      address={address}
                      validateCity={validateCity}
                    />
                  </div>

                  {/* end of col */}
                </div>
              </div>
            )}
            {/* row 1 */}
            <div className="row ">
              <div className="col-lg-12 text-left">
                {filter === false ? (
                  projectData ? (
                    projectData.length > 0 ? (
                      <div className="row" id="search2">
                        {projectData
                          .slice(0, 12)
                          .map(({ project: data, totalLikes }) => (
                            <ProjectList
                              data={data}
                              totalLikes={totalLikes}
                              RequestToView={RequestToView}
                              DefaultImage={DefaultImage}
                            />
                          ))}
                      </div>
                    ) : (
                      <center className="p-3">
                        <h5>No project found</h5>
                      </center>
                    )
                  ) : (
                    <Loaders />
                  )
                ) : typeof filteredArray !== typeof "" ? (
                  filteredArray ? (
                    <div className="row" id="search2">
                      {filteredArray &&
                        filteredArray.map((data) => (
                          <ProjectList
                            data={data}
                            filter={filter}
                            totalLikes={data.totalLikes}
                            DefaultImage={DefaultImage}
                          />
                        ))}
                    </div>
                  ) : (
                    <center>
                      <h1>No project found</h1>
                    </center>
                  )
                ) : (
                  <center>
                    <h1>No project found</h1>
                  </center>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  } else {
    return <Redirect to="/Login" />;
  }
}
export default withRouter(List);
