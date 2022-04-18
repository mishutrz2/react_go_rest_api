import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ViewAll from "./components/ViewAll";
import Prediction from "./components/Prediction";
// import AddPrediction from "./components/AddPrediction";
import Admin from "./components/Admin";
import MyPredictions from "./components/MyPredictions";
import EditPrediction from "./components/EditPrediction";
import { Component, Fragment } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
    };

    this.handleJWTChange = this.handleJWTChange.bind(this);
  }

  componentDidMount() {
    // token and nickname
    let t = window.localStorage.getItem("jwt");
    if (t) {
      if (this.state.jwt === "") {
        this.setState({
          jwt: JSON.parse(t),
        });
      }
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({ jwt: jwt });
  };

  logout = () => {
    this.setState({ jwt: "" });
    window.localStorage.removeItem("jwt");
  };

  render() {
    let loginLink;
    if (this.state.jwt === "") {
      loginLink = (
        <Link to="/login" className="loginButton">
          login
        </Link>
      );
    } else {
      loginLink = (
        <Fragment>
          <Link to="/logout" className="loginButton" onClick={this.logout}>
            <button className="btn btn-dark">logout</button>
          </Link>
        </Fragment>
      );
    }

    return (
      <Router>
        <hr className="my-4"></hr>
        <div className="container">
          <div className="row ">
            <div className="col-3 mt-1">{loginLink}</div>
            <div className="col mt-1">
              <h3 className="mb-2">
                Make your predictions for World Cup 2022 Qatar!
              </h3>
              <br />
            </div>
            <hr className="mb-3"></hr>
          </div>

          <div className="row ">
            <div className="col-md-3 ">
              <nav>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-primary">
                    <Link to="/" className="menuButtons">
                      {" "}
                      home{" "}
                    </Link>
                  </li>
                  <li className="list-group-item list-group-item-primary">
                    <Link to="/all" className="menuButtons">
                      {" "}
                      view all{" "}
                    </Link>
                  </li>
                  {this.state.jwt !== "" && (
                    <Fragment>
                      <li className="list-group-item list-group-item-primary">
                        <Link to={`/my`} className="menuButtons">
                          {" "}
                          my predictions{" "}
                        </Link>
                      </li>
                      <li className="list-group-item list-group-item-primary">
                        <Link to="/admin" className="menuButtons">
                          {" "}
                          account settings{" "}
                        </Link>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </nav>
            </div>

            <div className="col-md-8">
              <Switch>
                <Route path="/all/:id" component={Prediction}></Route>
                <Route path="/all">
                  <ViewAll />
                </Route>
                {/* <Route path="/my/0" component={EditPrediction}></Route> */}
                <Route
                  path="/admin/my/:id"
                  component={(props) => (
                    // push JWT property to EditPrediction component
                    <EditPrediction {...props} jwt={this.state.jwt} />
                  )}
                ></Route>

                {/* MY PREDICTIONS */}
                <Route
                  path="/my"
                  component={(props) => (
                    // push JWT property to EditPrediction component
                    <MyPredictions {...props} jwt={this.state.jwt} />
                  )}
                ></Route>

                {/* LOGIN  */}
                <Route
                  exact
                  path="/login"
                  component={(props) => (
                    <Login {...props} handleJWTChange={this.handleJWTChange} />
                  )}
                />

                {/* REGISTER */}
                <Route exact path="/register">
                  <Register />
                </Route>

                <Route
                  exact
                  path="/admin"
                  component={(props) => (
                    <Admin {...props} jwt={this.state.jwt} />
                  )}
                />

                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
        <br />
        <hr className="mb-5"></hr>
        <br />
      </Router>
    );
  }
}
