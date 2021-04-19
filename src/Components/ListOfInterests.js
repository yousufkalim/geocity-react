import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import InterestTableRow from "../shared/InterestTableRow";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserTable(props) {
  const {
    addToast,
    InterestList,
    DeleteInterest,
    // EditCategoryToggle,
  } = props;

  return (
    <>
      <Table responsive bordered>
        <thead>
          <tr className="text-center">
            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Category Name
            </th>

            <th style={{ padding: "0.75rem 0.3rem 0.75rem 0.3rem" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {InterestList && InterestList.length > 0 ? (
            InterestList &&
            InterestList.map((interest) => (
              <InterestTableRow
                interest={interest}
                DeleteInterest={DeleteInterest}
                // EditCategoryToggle={EditCategoryToggle}
              />
            ))
          ) : (
            <h5 className="text-dark text-center mt-2">No Interests found</h5>
          )}
        </tbody>
      </Table>
    </>
  );
}
