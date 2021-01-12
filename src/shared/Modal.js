import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loaders from "./Loaders";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Table from "./Table";
const ModalExample = (props) => {
  const { addToast } = useToasts();

  const {
    skillFieldData,
    sendInvite,
    searchBy,
    setsearchBy,
    MaterialData,
    id,
    materialList,
    SearchBySkills,
    SearchByMaterials,
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
          `http://localhost:3000/api/v1/project/SearchCollaboratorsByCategory?id=${id}`,
          {},

          headers
        )
        .then((res) => {
          setCategoryData(res.data);

          // addToast("Success", {
          //   appearance: "success",
          //   autoDismiss: true,
          //   autoDismissTimeout: 1000,
          //   placement: "bottom-right",
          // });
          // console.log(res,"res")
        })
        .catch((err) => {
          addToast("Error", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });

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
              <div className="col-lg-2"></div>
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
              <div className="col-lg-1"></div>
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
                MaterialData={MaterialData ? MaterialData : ""}
              />
            ) : searchBy === "Category" ? (
              <Table
                searchBy={searchBy}
                skillFieldData={skillFieldData}
                sendInvite={sendInvite}
                materialList={materialList}
                CategoryData={CategoryData ? CategoryData : ""}
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
