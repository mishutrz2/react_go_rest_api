import React, { Component, Fragment } from "react";

export default class Prediction extends Component {
  state = { prediction: {}, isLoaded: false, error: null };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_API_URL}/v1/all/` + this.props.match.params.id
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
            prediction: json.prediction,
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
    const { prediction, isLoaded, error } = this.state;
    if (error) {
      return <div> Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <p> Loading ... </p>;
    } else {
      return (
        <Fragment>
          <br />
          {/* <div className="float-start">
            <small> votes: {prediction.votes}</small>{" "}
          </div> */}
          {/* <div className="float-end">{prediction.id}</div> */}
          <table className="table table-compact table-striped">
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <strong> title: </strong>
                </td>
                <td> {prediction.title}</td>
              </tr>
              <tr>
                <td>
                  <strong> author: </strong>
                </td>
                <td> {prediction.author}</td>
              </tr>
              <tr>
                <td>
                  <strong> description: </strong>
                </td>
                <td> {prediction.description}</td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      );
    }
  }
}
