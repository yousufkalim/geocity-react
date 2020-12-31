import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import UserTableRow from "../shared/UsersTableRow";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserTable(props) {
  const { data, addToast, materialList, skillFieldList, DeleteUser } = props;

  return (
    <>
      <Table responsive bordered>
        <thead>
          <tr className="text-center">
            <th>Profile Picture</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Total Projects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data &&
            data.map((user) => (
              <UserTableRow data={user} DeleteUser={DeleteUser} />
            ))
          ) : (
            <h5 className="text-dark">No Users found</h5>
          )}
        </tbody>
      </Table>
    </>
  );
}
