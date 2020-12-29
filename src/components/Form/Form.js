import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./Form.css";

const Form = (props) => {
  const record = props.rows?.filter((row) => row.id === props.location.id)[0];

  const defaultValue = props.isEdit
    ? { ...record }
    : {
        name: "",
        phoneNumber: "",
        email: "",
        gender: "",
        locations: "",
      };

  const [formValue, setFormValue] = useState(defaultValue);
  const [formValidation, setFormValidation] = useState({
    nameMessage: "",
    phoneNumberMessage: "",
    emailMessage: "",
    genderMessage: "",
    locationsMessage: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const newFormValue = { ...formValue, [e.target.name]: e.target.value };

    setFormValue(newFormValue);
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      const newLocations = [...formValue.locations.split(",").filter(location=>location!==""), e.target.name];
      const newFormValue = { ...formValue, locations: newLocations.join(",") };
      setFormValue(newFormValue);
    } else {
      const newLocations = [...formValue.locations.split(",")].filter(
        (location) => location !== e.target.name
      );
      const newFormValue = { ...formValue, locations: newLocations.join(",") };
      setFormValue(newFormValue);
    }
  };

  const validate = () => {
    const { name, email, gender, locations, phoneNumber } = formValue;

    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    let nameMessage,
      emailMessage,
      genderMessage,
      locationsMessage,
      phoneNumberMessage;

    if (name === "") {
      nameMessage = "Required";
    }
    if (email === "" || !emailRegex.test(email)) {
      emailMessage = "Please enter correct email address";
    }
    if (gender === "" || gender==="Select") {
      genderMessage = "Required";
    }
    if (locations === "") {
      locationsMessage = "Required";
    }
    if (phoneNumber === "" || !phoneRegex.test(phoneNumber)) {
      phoneNumberMessage = "Required";
    }

    if (
      phoneNumberMessage ||
      emailMessage ||
      genderMessage ||
      locationsMessage ||
      phoneNumberMessage
    ) {
      setFormValidation({
        nameMessage: nameMessage,
        emailMessage: emailMessage,
        genderMessage: genderMessage,
        locationsMessage: locationsMessage,
        phoneNumberMessage: phoneNumberMessage,
      });
      return false;
    }

    return true;
  };

  const editRecord = (e) => {
    e.preventDefault();
    if (validate()) {
      props.editRow({ id: props.location.id, ...formValue });
      props.history.push("/");
    } else {
    }
  };

  const addRecord = (e) => {
    e.preventDefault();
    if (validate()) {
      const id = props.rows.length + 1;
      props.addRow({ id: id, ...formValue });
      props.history.push("/");
    } else {
    }
  };

  const handleBack=()=>{
    props.history.push('/')
  }

  const { name, phoneNumber, gender, locations, email } = formValue;
  const {
    nameMessage,
    phoneNumberMessage,
    genderMessage,
    emailMessage,
    locationsMessage,
  } = formValidation;
  const { btnText, isEdit } = props;

  const places = ["Bangalore", "Delhi", "Mumbai"];
  const checkboxes = places.map((place) => {
    const checkValue = locations.split(",").includes(place);

    return (
      <div key={place}>
        <input
          type="checkbox"
          value={place}
          name={place}
          checked={checkValue}
          onChange={handleCheckBox}
        />
        <label htmlFor="city1">{place}</label>
        <br></br>
      </div>
    );
  });

  return (
    <div className="form-body">
      <form>
        <label htmlFor="name">Name</label>
        <br></br>
        <input
          placeholder=" Enter name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <span className="alert">{nameMessage}</span>
        <br></br>
        <label htmlFor="name">Phone Number</label>
        <br></br>
        <input
          placeholder="Enter Phone Number"
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          pattern="\d{3}[\-]\d{3}[\-]\d{4}"
          onChange={handleChange}
        />
        <span className="alert">{phoneNumberMessage}</span>
        <br></br>
        <label htmlFor="name">Email</label>
        <br></br>
        <input
          placeholder=" Enter Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <span className="alert">{emailMessage}</span>
        <br></br>
        <label htmlFor="gender">Gender</label>
        <br></br>
        <select onChange={handleChange} value={gender} name="gender">
          <option value="Select">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <span className="alert">{genderMessage}</span>
        <br></br>
        <label htmlFor="locations">Preferred Locations</label>
        <br></br>
        {checkboxes}

        <span className="alert">{locationsMessage}</span>
        <div className="button-group">
          <span className="button" onClick={(e) => {
            isEdit ? editRecord(e) : addRecord(e);
          }}>

{btnText}
          </span>
      
        <span className="button" onClick={
          handleBack
        }>
          Back
        </span>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Form);
