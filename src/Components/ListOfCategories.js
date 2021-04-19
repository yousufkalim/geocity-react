import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryTableRow from "../shared/CategoryTableRow";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function UserTable(props) {
  const {
    data,
    addToast,
    CategoryList,
    DeleteCategory,
    EditCategoryToggle,
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
          {CategoryList && CategoryList.length > 0 ? (
            CategoryList &&
            CategoryList.map((category) => (
              <CategoryTableRow
                category={category}
                DeleteCategory={DeleteCategory}
                EditCategoryToggle={EditCategoryToggle}
              />
            ))
          ) : (
            <h5 className="text-dark text-center mt-2">No Category found</h5>
          )}
        </tbody>
      </Table>
    </>
  );
}
