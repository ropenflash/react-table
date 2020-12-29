import React from "react";
import './Table.css'
import {withRouter} from 'react-router-dom'

const Table = (props) => {

    const { columns, rows, deleteRow }= props

  const deleteRecord = (id) => {
    deleteRow(id)
   
  };


  const editRow = (id) => {
    props.history.push({pathname:'/edit',id:id})
  };

  const tableRows = rows.map((row) => (
    <tr key={row.id}>
      <td>{row.name}</td>
      <td>{row.phoneNumber}</td>
      <td>{row.email}</td>
      <td>{row.gender}</td>
      <td>{row.locations}</td>
      <td>
        <span className="table-edit-button"
          onClick={() => {
            editRow(row.id);
          }}
        >
          Edit
        </span >
      </td>
      <td>
        <span className="table-delete-button"
          onClick={() => {
            deleteRecord(row.id);
          }}
        >
          Delete
        </span >
      </td>
    </tr>
  ));

  const tableHeaders = columns.map((column) => <th colspan={column.span} key={column.id}>{column.title}</th>);
  return (
    <table id="details">
      <tbody>
        <tr>{tableHeaders}</tr>
        {tableRows}
      </tbody>
    </table>
  );
};

export default withRouter(Table);
