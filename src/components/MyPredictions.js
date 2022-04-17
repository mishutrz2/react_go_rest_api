import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default class MyPredictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPreds: [],
      isLoaded: false,
      error: null,
      noItems: false,
    };
  }

  componentDidMount() {
    // let payload = 3;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + this.props.jwt);
    // console.log(payload);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${process.env.REACT_APP_API_URL}/v1/my`, requestOptions)
      // .then((response) => response.json())
      .then((response) => {
        console.log("status code is ", response.status);
        if (response.status === 204) {
          this.setState({ noItems: true, isLoaded: true });
        } else if (response.status != 200) {
          let err = Error;
          err.message = "Invalid response code: " + response.status;
          this.setState({ error: err });
        }
        return response.json();
      })
      .then((json) => {
        this.setState(
          {
            myPreds: json.predictions,
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
  }

  render() {
    const { myPreds, isLoaded, error, noItems } = this.state;

    if (error) {
      return <div> Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <p> Loading ... </p>;
    } else if (noItems === true) {
      return (
        <Fragment>
          <br />
          <h4> my predictions </h4>

          <div className="mb-3">
            <Link to="/admin/my/0" className="menuButtons">
              <button className="btn btn-primary">add new</button>
            </Link>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <br />
          <h4> my predictions </h4>

          <div className="mb-3">
            <Link to="/admin/my/0" className="menuButtons">
              <button className="btn btn-primary">add new</button>
            </Link>
          </div>
          <div className="container">
            <ul className="list-group">
              {myPreds.map((el) => (
                <li key={el.id}>
                  <Link to={`/admin/my/${el.id}`} className="listButton">
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Fragment>
      );
    }
  }
}
