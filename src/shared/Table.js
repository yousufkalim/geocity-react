import React from "react";
import { Table } from "reactstrap";
import Loaders from "./Loaders";
import { Link } from "react-router-dom";
const Example = ({
  skillFieldData,
  sendInvite,
  searchBy,
  MaterialData,
  CategoryData,
  materialList,
}) => {
  const onSendInvite = (receiver) => {
    sendInvite(receiver);
  };
  // console.log(CategoryData, "CategoryData");
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
                <tr>
                  <th scope="row">{skill.username}</th>
                  <td>{skill.city}</td>

                  <td>
                    {skill.skills.map((sk) => (
                      <span>{sk.skill},</span>
                    ))}
                  </td>

                  <td>
                    <Link to={`/profile/${skill._id}`}>
                      <button
                        type="button"
                        id="modalButton1"
                        className="btn btn-primary text-white"
                      >
                        See profile
                      </button>
                    </Link>
                    <button
                      onClick={() => onSendInvite(skill._id)}
                      type="button"
                      id="modalButton2"
                      className="btn btn-primary text-white ml-4"
                    >
                      Invite
                    </button>
                  </td>
                </tr>
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
                <tr key={i}>
                  <th scope="row">{skill.username}</th>
                  <td>{skill.city}</td>

                  <td>
                    {skill.material.map((sk) => (
                      <span>{sk.name},</span>
                    ))}
                  </td>

                  <td>
                    <Link to={`/profile/${skill._id}`}>
                      <button
                        type="button"
                        id="modalButton1"
                        className="btn btn-primary text-white"
                      >
                        See profile
                      </button>
                    </Link>
                    <button
                      onClick={() => onSendInvite(skill._id)}
                      type="button"
                      id="modalButton2"
                      className="btn btn-primary text-white ml-4"
                    >
                      Invite
                    </button>
                  </td>
                </tr>
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
                <tr key={i}>
                  <th scope="row">{skill.username}</th>
                  <td>{skill.city}</td>

                  <td>
                    {skill
                      ? skill.material.map((data) => {
                          // let icon = <TagFacesIcon />;
                          return materialList.map((mat) => {
                            if (mat._id === data) {
                              return <span>{mat.name},</span>;
                            }
                          });
                        })
                      : ""}
                  </td>

                  <td>
                    <Link to={`/profile/${skill._id}`}>
                      <button
                        type="button"
                        id="modalButton1"
                        className="btn btn-primary text-white"
                      >
                        See profile
                      </button>
                    </Link>
                    <button
                      onClick={() => onSendInvite(skill._id)}
                      type="button"
                      id="modalButton2"
                      className="btn btn-primary text-white ml-4"
                    >
                      Invite
                    </button>
                  </td>
                </tr>
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
