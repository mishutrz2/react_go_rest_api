import Alert from "../ui-components/Alert";
import React, { Component, Fragment } from "react";
import Input from "./form-components/Input";
import { Link } from "react-router-dom";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      id_user: 0,
      error: null,
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

    if (this.state.email === "") {
      errors.push("email");
    }

    if (this.state.password === "") {
      errors.push("password");
    }

    this.setState({ errors: errors });

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    fetch(`${process.env.REACT_APP_API_URL}/v1/signin`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          this.setState({
            alert: {
              type: "alert-danger",
              message: data.error.message,
            },
          });
        } else {
          this.handleJWTChange(Object.values(data)[0]);
          // console.log(Object.values(data)[0].token);

          // set token in local storage
          window.localStorage.setItem(
            "jwt",
            JSON.stringify(Object.values(data)[0])
          );

          // set nickname in local storage
          // window.localStorage.setItem(
          //   "nickname",
          //   JSON.stringify(Object.values(data)[0].nickname)
          // );

          // // set userID in local storage
          // window.localStorage.setItem(
          //   "id_user",
          //   JSON.stringify(Object.values(data)[0].id_user)
          // );

          this.props.history.push({
            pathname: "/",
          });
        }
      });
  };

  // lift state to parent component after login
  handleJWTChange(jwt) {
    this.props.handleJWTChange(jwt);
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  render() {
    return (
      <Fragment>
        <br />

        <div class="row">
          <div class="col-12 col-md-8">
            <h2> login page </h2>
          </div>
          <div class="col-8 col-md-4">
            <h6>
              {" "}
              No account? Click{" "}
              <Link to="/register" className="registerButton">
                {" "}
                here{" "}
              </Link>
              to register{" "}
            </h6>
          </div>
        </div>

        <hr />

        <Alert
          alertType={this.state.alert.type}
          alertMessage={this.state.alert.message}
        />

        <form className="pt-4" onSubmit={this.handleSubmit}>
          <Input
            title={"email"}
            type={"email"}
            name={"email"}
            handleChange={this.handleChange}
            className={this.hasError("email") ? "is-invalid" : ""}
            errorDiv={this.hasError("email") ? "text-danger" : "d-none"}
            errorMsg={"enter valid email address"}
          />
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
          <button className="btn btn-primary"> login </button>
        </form>
      </Fragment>
    );
  }
}
