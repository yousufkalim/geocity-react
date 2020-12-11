import React, { useEffect, useState } from "react";
import "../Theme/css/list.css";
import axios from "axios";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Loader from "../shared/Loaders";
import Autocomplete from "react-autocomplete";
import ProjectList from "../Components/projectList";
import DefaultImage from "../Theme/images/index.png";
import { isAuthenticated } from "../Auth/Index";
import { Redirect } from "react-router-dom";
import SelectBox from "../shared/select";
import { useToasts } from "react-toast-notifications";

export default function List() {
  const { addToast } = useToasts();

  const filterData = {
    category: "",
    skillField: "",
    city: "",
  };
  const [filterFormData, setfilterFormData] = useState("");

  const [projectData, setProjectData] = useState("");
  const [CategoryList, setCategoryList] = useState("");
  const [filteredArray, setfilteredArray] = useState([]);

  const [category, setCategory] = useState("");
  const [request, setRequest] = useState(false);

  const [filter, setFilter] = useState(false);

  const [requestCount, setrequestCount] = useState(0);
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);

  const [skillfieldList, setskillFieldList] = useState("");

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    try {
      axios
        .get("http://localhost:3000/api/v1/auth/skillList")
        .then((res) => {
          const array = [...res.data.skills];
          const options = array.map((arr, i) => ({
            value: arr._id,
            label: arr.skillField,
          }));
          setskillFieldList(options);
          // console.log(res, "res skilllist");
        })
        .catch((err) => console.log(" error =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
    try {
      axios
        .get("http://localhost:3000/api/v1/admin/categoryList", headers)
        .then((res) => {
          const array = [...res.data.categories];
          const options = array.map((arr) => ({
            value: arr._id,
            label: arr.name,
          }));
          setCategoryList(options);

          // console.log(res, "response cat");
        })
        .catch((err) => console.log(" error category =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
    try {
      axios
        .get("http://localhost:3000/api/v1/auth/projectList")
        .then((res) => {
          setProjectData(res.data.projects);
          console.log(res, "response project");
        })
        .catch((err) => console.log(" error project =>", err));
    } catch (error) {
      // console.log(error, "error catch");
    }
  }, []);

  // request for view

  const RequestToView = (id) => {
    if (!isAuthenticated()) {
      setRequest(true);
      // alert("hello");
      // window.location.href = "/Login";
    } else {
      if (requestCount >= 0) {
        setRequest(false);

        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        };
        try {
          axios
            .post(
              `http://localhost:3000/api/v1/project/view-project/send-request?id=${id}`,
              {},
              headers
            )
            .then((res) => {
              addToast("Success", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 1000,
              });
              setrequestCount(requestCount + 1);
              // setProjectData(res.data);
              // setProjectData(res.data.projects);
              // console.log(res, "response projectCatgeoryData");
            })
            .catch((err) => {
              addToast("Error", {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 1000,
              });
              console.log(" error request =>", err);
            });
        } catch (error) {
          // setFilter(false);
        }
      } else {
        addToast("You already sent request to owner", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 1000,
        });
      }
    }
  };

  const handleCategoryChange = (e) => {
    // alert(e.value);
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    setfilterFormData({ ...filterFormData, ["category"]: e.value });
    try {
      axios
        .post(
          "http://localhost:3000/api/v1/project/search/category",
          { category: e.value },
          headers
        )
        .then((res) => {
          setFilter(true);
          // setProjectData(res.data);
          if (res.data.length > 0) {
            setfilteredArray(res.data);
          }
          // setProjectData(res.data.projects);
          // console.log(res, "response projectCatgeoryData");
        })
        .catch((err) => {
          setFilter(false);
          // console.log(" error project =>", err);
        });
    } catch (error) {
      setFilter(false);
    }
  };
  // *********
  const handleFieldChange = (e) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    setfilterFormData({ ...filterFormData, ["skillField"]: e.value });

    // console.log(e.target.value, "e.target.value");
    try {
      axios
        .post(
          "http://localhost:3000/api/v1/project/search/skill",
          { skill: e.value },
          headers
        )
        .then((res) => {
          setFilter(true);
          // setProjectData(res.data);
          if (res.data) {
            setfilteredArray(res.data.projects);
          } else {
            // alert("hello");
            setfilteredArray([]);
          }
          // setProjectData(res.data.projects);
          // console.log(res, "response projectskillData");
        })
        .catch((err) => {
          setFilter(false);
          // console.log(" error project skill =>", err);
        });
    } catch (error) {
      setFilter(false);
    }
  };
  // const validateCity = () => {
  //   if (address) {
  //     // alert("hello");
  //     const msg = "";
  //     setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
  //     return false;
  //   } else if (!adress) {
  //     let msg = "Required";
  //     setAboutRequiredFields({ ...aboutRequiredFields, city: msg });
  //     return false;
  //   }
  // };
  const getAddress = (e) => {
    setAddress(e.target.value);
    // validateCity();

    fetch(
      "https://api-adresse.data.gouv.fr/search/?q=" +
        e.target.value +
        "&type=housenumber&autocomplete=1&limit=10"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("res address", responseJson);
        var addressToSet = [];
        // debugger;
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
          // setFormData({ ...formData,items:addressToSet })
          setItems(addressToSet);
        }
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  // console.log(projectData, "project data");
  const SetAddress = (item) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // console.log(item,'item')
    setAddress(item);
    // this.setState({ address: item });

    for (let i = 0; i < items.length; i++) {
      if (items[i].label === item) {
        // debugger;
        var city = items[i].city;
        var zipCode = items[i].PostalCode;
        var lat = items[i].lat.toString();
        var lng = items[i].lng.toString();
        // var street = items[i].context.toString();

        var newAddress = items[i].label.split(String(zipCode));
      }
    }
    // console.log(city, "city");
    try {
      axios
        .post(
          "http://localhost:3000/api/v1/project/search/city",
          { city: city },
          headers
        )
        .then((res) => {
          setFilter(true);
          // setProjectData(res.data);
          setfilteredArray(res.data.projects);
          // setProjectData(res.data.projects);
          console.log(res, "response projectcityData");
        })
        .catch((err) => {
          setFilter(false);
          console.log(" error project =>", err);
        });
    } catch (error) {
      setFilter(false);
    }
  };
  // console.log(filteredArray, "fltered array");
  if (request === false) {
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
                <SelectBox
                  name="category"
                  id="category"
                  CategoryList={CategoryList}
                  value={filterFormData.category}
                  onChange={handleCategoryChange}
                />
                {/* <select
                  class="form-control"
                  id="sel1"
                  name="category"
                  id="category"
                  value={filterFormData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  {CategoryList
                    ? CategoryList.map((cat) => (
                        <option value={cat._id} key={cat._id}>
                          {cat.name}
                        </option>
                      ))
                    : ""}
                </select> */}
              </div>

              <div className="col-lg-2 " id="selectbox2">
                {/* <select
                  class="form-control"
                  name="skillField"
                  id="skillField"
                  value={filterFormData.skillField}
                  onChange={handleChange}
                >
                  <option value="">Select SkillField</option>

                  {skillfieldList
                    ? skillfieldList.map((mat) => (
                        <option value={mat._id}>{mat.skillField}</option>
                      ))
                    : ""}
                </select> */}

                <SelectBox
                  name="skillField"
                  id="category"
                  CategoryList={skillfieldList}
                  value={filterFormData.category}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="col-lg-3" id="selectbox3">
                {/* <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lieu du project"
                  />
                </div>
              </form> */}
                <Autocomplete
                  items={items}
                  // shouldItemRender={(item, value) =>
                  //   item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                  // }
                  wrapperProps={<i className="fas fa-heart " />}
                  getItemValue={(item) => item.label}
                  renderItem={(item, highlighted) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: highlighted ? "#eee" : "transparent",
                      }}
                    >
                      {item.label}
                    </div>
                  )}
                  wrapperStyle={{
                    display: "block",
                  }}
                  menuStyle={{
                    zIndex: "1",
                    position: "static",
                    borderRadius: "3px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                    background: "rgba(255, 255, 255, 0.9)",
                    padding: "2px 12px",
                    fontSize: "90%",
                    color: "#000",
                    overflow: "auto",
                    maxHeight: "50%",
                  }}
                  inputProps={{
                    className: "form-control",
                    placeholder: "Enter City ",
                  }}
                  value={address}
                  name="address"
                  onChange={getAddress}
                  onSelect={SetAddress}
                />
              </div>
              <div className="col-lg-3" />
              {/* end of col */}
            </div>
            {/* row 1 */}
            {filter === false ? (
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
                <center>
                  <h1>No project found</h1>
                </center>
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
            {/* row end */}

            {/* row end */}

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
  } else {
    return <Redirect to="/Login" />;
  }
}
