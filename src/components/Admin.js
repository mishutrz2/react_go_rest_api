import React, { Component, Fragment } from "react";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        // name: "",
        // nick: "",
        // from: "",
        // email: "",
      },
    };
  }

  componentDidMount() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + this.props.jwt);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${process.env.REACT_APP_API_URL}/v1/user-info`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
        } else {
          // console.log(data.user);
          this.setState({
            user: data.user,
          });
        }
      });
  }

  render() {
    return (
      <Fragment>
        <br />
        <h4> my account </h4>
        <br />
        <table className="table ">
          <thead>
            <tr>
              <th> Name </th>
              <th> Nickname </th>
              <th> From </th>
              <th> Email </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {this.state.user.full_name} </td>
              <td> {this.state.user.nickname} </td>
              <td> {this.state.user.country} </td>
              <td> {this.state.user.email} </td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}
