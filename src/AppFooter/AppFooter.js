import react, { Component, Fragment } from "react";
import "./AppFooter.css";

export class AppFooter extends Component {
  render() {
    return (
      <Fragment>
        <div className="backgr">
          <h5 className="infoText"> Copyright &copy; 2022 mishu</h5>
        </div>
      </Fragment>
    );
  }
}
