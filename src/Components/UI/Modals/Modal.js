import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loaders from "../../../shared/Loaders";
import axios from "axios";
import { url } from "../../../urlConfig";

import { useToasts } from "react-toast-notifications";
import Table from "../../../shared/Table";
const ModalExample = (props) => {
  const { addToast } = useToasts();

  const {
    skillFieldData,
    sendInvite,
    searchBy,
    setsearchBy,
    MaterialData,
    intentionData,
    id,
    materialList,
    SearchBySkills,
    SearchByMaterials,
    SearchByintentions,
    InviteId,
    data,
    singleStep,
  } = props;
  // console.log(skillFieldData, "skill field data");
  const [CategoryData, setCategoryData] = useState("");
  // console.log(MaterialData, "MaterialData");
  const SearchByCategory = async () => {
    setsearchBy("Category");
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      await axios
        .post(
          `${url}/api/v1/project/SearchCollaboratorsByCategory?id=${id}`,
          {},

          headers
        )
        .then((res) => {
          const filter = res.data.filter(
            (dt) =>
              dt._id !== data.project.project_owner._id && dt.role !== "admin"
          );
          setCategoryData(filter);

          // addToast("Success", {
          //   appearance: "success",
          //   autoDismiss: true,
          //   autoDismissTimeout: 1000,
          //   placement: "bottom-right",
          // });
          // console.log(res,"res")
        })
        .catch((err) => {
          console.log(" error =>", err);
        });
    } catch (error) {
      console.log(error, "error catch");
    }
  };
  const SearchBySkill = () => {
    SearchBySkills("skills", InviteId);
  };
  const SearchByMaterial = () => {
    SearchByMaterials("material", InviteId);
  };
  const SearchByintention = () => {
    SearchByintentions("intention", InviteId);
  };
  return (
    <div>
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        className="modal-xl"
        style={{ width: "70%", borderRadius: "4rem" }}
      >
        <ModalHeader toggle={props.toggle}></ModalHeader>
        <ModalBody>
          <>
            <h6
              className="text-center text-dark"
              style={{
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "22px",
                color: "#000",
              }}
            >
              <i className="fas fa-search text-dark"></i> SEARCH BY :
            </h6>
            <div className="row  mt-4">
              <div className="col-lg-3">
                <button
                  type="button"
                  onClick={SearchByMaterial}
                  // id="userButton"
                  id="modalButton"
                  className={
                    searchBy === "skills" || searchBy === "Category"
                      ? "btn bg-light text-dark border"
                      : "btn "
                  }
                >
                  Goods
                </button>
              </div>

              <div className="col-lg-3">
                <button
                  onClick={SearchBySkill}
                  type="button"
                  id="modalButton"
                  className={
                    searchBy === "material" || searchBy === "Category"
                      ? "btn bg-light text-dark border"
                      : "btn "
                  }
                >
                  Field
                </button>
              </div>
              <div className="col-lg-3">
                <button
                  onClick={SearchByCategory}
                  type="button"
                  id="modalButton"
                  className={
                    searchBy === "Category"
                      ? "btn "
                      : "bg-light text-dark border"
                  }
                >
                  Category
                </button>
              </div>
              <div className="col-lg-3">
                <button
                  onClick={SearchByintention}
                  type="button"
                  id="modalButton"
                  className={
                    searchBy === "Intention"
                      ? "btn "
                      : "bg-light text-dark border"
                  }
                >
                  Intention
                </button>
              </div>
            </div>
            {searchBy === "skills" ? (
              <Table
                searchBy={searchBy}
                sendInvite={sendInvite}
                singleStep={singleStep}
                skillFieldData={skillFieldData ? skillFieldData : ""}
              />
            ) : searchBy === "material" ? (
              <Table
                searchBy={searchBy}
                sendInvite={sendInvite}
                singleStep={singleStep}
                MaterialData={MaterialData ? MaterialData : ""}
              />
            ) : searchBy === "Category" ? (
              <Table
                searchBy={searchBy}
                skillFieldData={skillFieldData}
                sendInvite={sendInvite}
                singleStep={singleStep}
                materialList={materialList}
                CategoryData={CategoryData ? CategoryData : ""}
              />
            ) : searchBy === "Intention" ? (
              <Table
                searchBy={searchBy}
                skillFieldData={skillFieldData}
                sendInvite={sendInvite}
                singleStep={singleStep}
                materialList={materialList}
                intentionData={intentionData ? intentionData : ""}
              />
            ) : (
              ""
            )}
          </>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalExample;
