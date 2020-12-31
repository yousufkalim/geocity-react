import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTableRow from "../shared/MaterialTableRow";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserTable(props) {
  const { data, addToast, materialList, DeleteMaterial, Edittoggle } = props;

  return (
    <>
      <Table responsive bordered>
        <thead>
          <tr className="text-center">
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Material Name
            </th>

            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {materialList && materialList.length > 0 ? (
            materialList &&
            materialList.map((material) => (
              <MaterialTableRow
                material={material}
                DeleteMaterial={DeleteMaterial}
                Edittoggle={Edittoggle}
              />
            ))
          ) : (
            <h5 className="text-dark text-center mt-2">No Materials found</h5>
          )}
        </tbody>
      </Table>
    </>
  );
}
