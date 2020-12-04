import React from "react";
import { Table } from "reactstrap";
import Loaders from "./Loaders";
import { Link } from "react-router-dom";
const Example = ({ skillFieldData, sendInvite, searchBy }) => {
  const onSendInvite = (receiver, skills) => {
    sendInvite(receiver, skills);
  };
  console.log(skillFieldData, "skildlak");
  if (skillFieldData && typeof skillFieldData !== typeof "") {
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
                  {searchBy === "skills" ? (
                    <td>{skill.skills.map((sk) => sk.skill)}</td>
                  ) : searchBy === "material" ? (
                    <td>{skill.material[0]}</td>
                  ) : (
                    ""
                  )}
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
                      onClick={() =>
                        onSendInvite(skill._id, skill.skills[0].skillField)
                      }
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
    return <h5 className="text-center">no collaborator found</h5>;
  }
};

export default Example;
