import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import SkillsTableRow from "../shared/SkillsTableRow";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserTable(props) {
  const { data, addToast, materialList, DeleteSkillField, Edittoggle } = props;

  return (
    <>
      <Table responsive bordered>
        <thead>
          <tr className="text-center">
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Skill Field
            </th>
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>Skill</th>

            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data &&
            data.map((skillField) => (
              <SkillsTableRow
                skillField={skillField}
                DeleteSkillField={DeleteSkillField}
                Edittoggle={Edittoggle}
              />
            ))
          ) : (
            <h5 className="text-dark">No Users found</h5>
          )}
        </tbody>
      </Table>
    </>
  );
}
