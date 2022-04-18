import Alert from "../ui-components/Alert";
import React, { Component, Fragment } from "react";
import Input from "./form-components/Input";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      nickname: "",
      country: "",
      email: "",
      password: "",
      error: null,
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      },
    };

    // ????? ???? ????
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  // after user modification, handle changes
  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];

    // check for empty fields and push errors if any empty fields
    if (this.state.email === "") {
      errors.push("email");
    }
    if (this.state.password === "") {
      errors.push("password");
    }
    if (this.state.country === "") {
      errors.push("country");
    }
    if (this.state.full_name === "") {
      errors.push("full_name");
    }
    if (this.state.nickname === "") {
      errors.push("nickname");
    }

    // set errors inside state
    this.setState({ errors: errors });

    // if there are errors, dont submit
    if (errors.length > 0) {
      return false;
    }

    // get data from HTML form
    const data = new FormData(e.target);

    // form a payload
    const payload = Object.fromEntries(data.entries());

    // request options for POST
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    console.log(payload);

    fetch(`${process.env.REACT_APP_API_URL}/v1/signup`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({
            alert: {
              type: "alert-danger",
              message: data.error.message,
            },
          });
        } else {
          this.props.history.push({
            pathname: "/login",
          });
        }
      });
  };

  render() {
    return (
      <Fragment>
        <br />
        <h2> create a new account </h2>
        <br />

        <form className="pt-4" onSubmit={this.handleSubmit}>
          {/* FULL NAME */}
          <Input
            title={"full name"}
            type={"text"}
            name={"full_name"}
            handleChange={this.handleChange}
            className={this.hasError("full_name") ? "is-invalid" : ""}
            errorDiv={this.hasError("full_name") ? "text-danger" : "d-none"}
            errorMsg={"enter full name"}
          />

          {/* NICKNAME */}
          <Input
            title={"nickname"}
            type={"text"}
            name={"nickname"}
            handleChange={this.handleChange}
            className={this.hasError("nickname") ? "is-invalid" : ""}
            errorDiv={this.hasError("nickname") ? "text-danger" : "d-none"}
            errorMsg={"enter nickname"}
          />

          {/* COUNTRY */}
          <Input
            title={"country"}
            type={"text"}
            name={"country"}
            handleChange={this.handleChange}
            className={this.hasError("country") ? "is-invalid" : ""}
            errorDiv={this.hasError("country") ? "text-danger" : "d-none"}
            errorMsg={"enter country"}
          />

          {/* EMAIL ADDRESS */}
          <Input
            title={"email"}
            type={"email"}
            name={"email"}
            handleChange={this.handleChange}
            className={this.hasError("email") ? "is-invalid" : ""}
            errorDiv={this.hasError("email") ? "text-danger" : "d-none"}
            errorMsg={"enter valid email address"}
          />

          {/* PASSWORD */}
          <Input
            title={"password"}
            type={"password"}
            name={"password"}
            handleChange={this.handleChange}
            className={this.hasError("password") ? "is-invalid" : ""}
            errorDiv={this.hasError("password") ? "text-danger" : "d-none"}
            errorMsg={"enter password"}
          />
          <hr />
          <button className="btn btn-primary"> create account </button>
        </form>
      </Fragment>
    );
  }
}
