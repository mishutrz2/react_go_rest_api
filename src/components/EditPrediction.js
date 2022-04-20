import React, { Component, Fragment } from "react";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Alert from "../ui-components/Alert";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Select from "./form-components/Select";

const teams = [
  { id: "Qatar", value: "Qatar" },
  { id: "Ecuador", value: "Ecuador" },
  { id: "Senegal", value: "Senegal" },
  { id: "Netherlands", value: "Netherlands" },
  { id: "England", value: "England" },
  { id: "Iran", value: "Iran" },
  { id: "USA", value: "USA" },
  { id: "Ukraine/Scotland/Wales", value: "Ukraine/Scotland/Wales" },

  { id: "Argentina", value: "Argentina" },
  { id: "Saudi Arabia", value: "Saudi Arabia" },
  { id: "Mexico", value: "Mexico" },
  { id: "Poland", value: "Poland" },
  { id: "France", value: "France" },
  { id: "Australia/UAE/Peru", value: "Australia/UAE/Peru" },
  { id: "Denmark", value: "Denmark" },
  { id: "Tunisia", value: "Tunisia" },

  { id: "Spain", value: "Spain" },
  { id: "Costa Rica/New Zealand", value: "Costa Rica/New Zealand" },
  { id: "Germany", value: "Germany" },
  { id: "Japan", value: "Japan" },
  { id: "Belgium", value: "Belgium" },
  { id: "Canada", value: "Canada" },
  { id: "Morocco", value: "Morocco" },
  { id: "Croatia", value: "Croatia" },

  { id: "Brazil", value: "Brazil" },
  { id: "Serbia", value: "Serbia" },
  { id: "Switzerland", value: "Switzerland" },
  { id: "Cameroon", value: "Cameroon" },
  { id: "Portugal", value: "Portugal" },
  { id: "Ghana", value: "Ghana" },
  { id: "Uruguay", value: "Uruguay" },
  { id: "South Korea", value: "South Korea" },
];

export default class EditPrediction extends Component {
  // set the state inside the constructor
  constructor(props) {
    super(props);
    this.state = {
      prediction: {
        id: 0,
        votes: 0,
        title: "",
        description: "",
        updated_at: "",
        winner: "",
      },
      isLoaded: false,
      error: null,
      wasSuccess: false,
      pageName: "edit",
      errors: [],
      alert: {
        type: "d-none",
        message: "",
      },
    };

    // handler for change/submit
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // method vs arrow function
  handleSubmit(e) {
    console.log("Form was submitted");
    e.preventDefault();

    // client side validation
    let errors = [];
    if (this.state.prediction.title === "") {
      errors.push("title");
    }

    this.setState({ errors: errors, wasSuccess: false });

    if (errors.length > 0) {
      return false;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    // payload.author = this.props.id_user.toString();
    // console.log(this.props.id_user.toString());
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + this.props.jwt);
    // console.log(payload);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: myHeaders,
    };

    fetch(`${process.env.REACT_APP_API_URL}/v1/admin/edit`, requestOptions)
      .then((respone) => respone.json())
      .then((data) => {
        this.setState({
          wasSuccess: false,
        });
        if (data.error) {
          this.setState({
            alert: { type: "alert-danger", message: data.error.message },
          });
        } else {
          this.setState({
            wasSuccess: true,
            alert: { type: "alert-success", message: "Success" },
          });
        }
      });
  }

  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.setState((prevState) => ({
      prediction: {
        ...prevState.prediction,
        [name]: value,
      },
    }));
  }

  hasError(key) {
    return this.state.errors.indexOf(key) !== -1;
  }

  // lifecycleuri =>> mereu metode !!!

  componentDidUpdate() {
    if (this.state.wasSuccess === true) {
      this.props.history.push({
        pathname: `/my`,
      });

      return;
    }
  }

  componentDidMount() {
    // check if prop jwt has a value
    if (this.props.jwt === "") {
      this.props.history.push({
        pathname: "/login",
      });

      return;
    }

    const id = this.props.match.params.id;
    if (id > 0) {
      fetch(
        `${process.env.REACT_APP_API_URL}/v1/my/` + this.props.match.params.id
      )
        // .then((response) => response.json())
        .then((response) => {
          console.log("status code is ", response.status);
          if (response.status != 200) {
            let err = Error;
            err.message = "Invalid response code: " + response.status;
            this.setState({ error: err });
          }
          return response.json();
        })
        .then((json) => {
          this.setState(
            {
              // prediction: json.prediction,
              prediction: {
                id: id,
                title: json.prediction.title,
                description: json.prediction.description,
                winner: json.prediction.winner,
              },
              isLoaded: true,
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          );
        });
    } else {
      this.setState({ pageName: "add new" });
      this.setState({ isLoaded: true });
    }
  }

  // when clicking on delete button
  confirmDelete = (e) => {
    // console.log(this.state.prediction.id);
    confirmAlert({
      title: "delete prediction",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + this.props.jwt);

            fetch(
              `${process.env.REACT_APP_API_URL}/v1/admin/delete/` +
                this.state.prediction.id,
              {
                method: "GET",
                headers: myHeaders,
              }
            )
              .then((response) => response.json)
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
                    pathname: `/my`,
                  });
                }
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    let { prediction, isLoaded, error } = this.state;
    if (error) {
      return <div> Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <p> Loading ... </p>;
    } else {
      return (
        <Fragment>
          <br />

          {/* <div className="float-end">{prediction.id}</div> */}
          <br />

          <h4> {this.state.pageName} </h4>

          <br />
          <Alert
            alertType={this.state.alert.type}
            alertMessage={this.state.alert.message}
          />
          {/* <div className="float-end">votes: {prediction.votes}</div> */}
          <form onSubmit={this.handleSubmit}>
            <Input
              type="hidden"
              name="id"
              id="id"
              value={prediction.id}
              handleChange={this.handleChange}
            />

            <div className="mb-3">
              <Input
                className={this.hasError("title") ? "is-invalid" : ""}
                title="Title"
                type="text"
                name="title"
                value={prediction.title}
                handleChange={this.handleChange}
                errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                errorMsg={"Please enter a title!"}
              />

              <Select
                title={"Winner"}
                name={"winner"}
                options={teams}
                value={prediction.winner}
                handleChange={this.handleChange}
                placeholder={"Choose one ... "}
              />

              <br />
              <TextArea
                title="Description"
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={prediction.description}
                handleChange={this.handleChange}
                rows="2"
              />
            </div>
            <br />
            <button className="btn btn-primary"> save </button>
            <Link to={`/my`} className="btn btn-warning ms-2">
              cancel
            </Link>
            {prediction.id > 0 && (
              <a
                href="#!"
                onClick={() => this.confirmDelete()}
                className="btn btn-danger ms-2"
              >
                delete
              </a>
            )}
          </form>
          <br />

          {/* show json format */}
          {/* <div className="mt-3">
            <pre> {JSON.stringify(this.state, null, 3)}</pre>
          </div> */}
        </Fragment>
      );
    }
  }
}
