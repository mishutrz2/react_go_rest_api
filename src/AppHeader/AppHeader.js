import react, { Component, Fragment } from "react";
import "./AppHeader.css";

export class AppHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="backG">
          <h2 className="title">. . . super interesting project</h2>
          <h2 className="title"> react + go </h2>
        </div>
      </Fragment>
    );
  }
}
