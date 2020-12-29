import React  from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'
import Table from "./components/Table/Table";

const Home = (props) => {

  const { rows, columns, deleteRow } = props;

  const addRecord=()=>{
      props.history.push('/add')
  }
  return (
    <div>
      <h1>Home</h1>
      <Table rows={rows} columns={columns} deleteRow={deleteRow} />
      <span className="button" style={{display:"block", width:"500px"}} onClick={addRecord}>Add New Record</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { rows, columns } = state;
  return {
    rows,
    columns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRow: (id) => {
      dispatch({ type: "DELETE", payload: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
