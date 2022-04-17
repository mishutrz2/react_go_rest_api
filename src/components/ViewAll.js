import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class ViewAll extends Component {
  state = {
    predics: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    // fetch for grabbing data
    fetch(`${process.env.REACT_APP_API_URL}/v1/all`)
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
            predics: json.predictions,
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
    const { predics, isLoaded, error } = this.state;
    if (error) {
      return <div> Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <p> Loading ... </p>;
    } else {
      return (
        <Fragment>
          <br />
          <h4> view all </h4>
          <br />
          <ul>
            {predics.map((el) => (
              <li key={el.id}>
                <Link to={`/all/${el.id}`} className="listButton">
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }
  }
}
