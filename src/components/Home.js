import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <br />

        <div>
          <h4> About this website </h4>
          <p className="descriptivePs">
            This website is a personal project started in April 2022. The main
            goal is familiarization with Golang programming language and with
            ReactJS library by developing a simple web applicaction.
            Communication between the database and this website is performed by
            implementing a REST API service.
          </p>
          <h4> How to use </h4>
          <p className="descriptivePs">
            Predictions for the 2022 Wolrd Cup Qatar can be registered, logged
            into a database and extracted in order to be displayed on this
            website. By default, you can only view the predictions list. In
            order to register a new prediction, you must log in first.
          </p>
          <h4> Contact </h4>
          <p>Name: Mircea</p>
          <p>Location: Romania</p>
          <p>Email: mishutrz2@yahoo.com</p>
        </div>
      </div>
    );
  }
}
