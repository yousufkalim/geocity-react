import React, { useEffect } from "react";
import { Table } from "reactstrap";
import Loaders from "./Loaders";
import SearchSkillTableRow from "./SearchSkillTableRow";
import SearchMaterialTableRow from "./SearchMaterialTableRow";
import SearchCategoryTableRow from "./SearchCategoryTableRow";
import { useToasts } from "react-toast-notifications";

import { Link } from "react-router-dom";
const Example = ({
  skillFieldData,
  sendInvite,
  searchBy,
  MaterialData,
  CategoryData,
  materialList,
  singleStep,
}) => {
  const { addToast } = useToasts();
  const onSendInvite = (receiver) => {
    const fil = singleStep.contributing_user.find((ft) => ft._id == receiver);
    if (fil) {
      addToast("This user is already a contributor", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } else {
      sendInvite(receiver);
    }
  };
  // console.log(singleStep, "singleStep");
  if (
    skillFieldData &&
    typeof skillFieldData !== typeof "" &&
    Object.keys(skillFieldData).length > 0 &&
    searchBy === "skills"
  ) {
    return (
      <div className="col-lg-12 text-center " style={{ marginTop: "5rem" }}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}> Name</th>
              <th style={{ width: "20%" }}>City</th>
              <th style={{ width: "20%" }}>Fields</th>
              <th style={{ width: "40%" }}></th>
            </tr>
          </thead>
          <tbody>
            {skillFieldData &&
              skillFieldData.map((skill) => (
                <SearchSkillTableRow
                  skill={skill}
                  Link={Link}
                  onSendInvite={onSendInvite}
                  singleStep={singleStep}
                />
              ))}
          </tbody>
        </Table>
      </div>
    );
  } else if (
    MaterialData &&
    typeof MaterialData !== typeof "" &&
    Object.keys(MaterialData).length > 0 &&
    searchBy === "material"
  ) {
    return (
      <div className="col-lg-12 text-center " style={{ marginTop: "5rem" }}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}> Name</th>
              <th style={{ width: "20%" }}>City</th>
              <th style={{ width: "20%" }}>Goods</th>
              <th style={{ width: "40%" }}></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(MaterialData).length > 0 &&
              MaterialData.map((skill, i) => (
                <SearchMaterialTableRow
                  skill={skill}
                  Link={Link}
                  onSendInvite={onSendInvite}
                  singleStep={singleStep}
                />
              ))}
          </tbody>
        </Table>
      </div>
    );
  } else if (
    CategoryData &&
    typeof CategoryData !== typeof "" &&
    Object.keys(CategoryData).length > 0 &&
    searchBy === "Category"
  ) {
    return (
      <div className="col-lg-12 text-center " style={{ marginTop: "5rem" }}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}> Name</th>
              <th style={{ width: "20%" }}>City</th>
              <th style={{ width: "20%" }}>Goods</th>
              <th style={{ width: "40%" }}></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(CategoryData).length > 0 &&
              CategoryData.map((skill, i) => (
                <SearchCategoryTableRow
                  skill={skill}
                  Link={Link}
                  onSendInvite={onSendInvite}
                  singleStep={singleStep}
                  materialList={materialList}
                />
              ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return <h5 className="text-center mt-4">No users found</h5>;
  }
};

export default Example;
