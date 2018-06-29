import React, { Component } from "react";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import Header from "./components/Header";

import { Route } from "react-router-dom";

import axios from "axios";

const URL = "http://localhost:3333/smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get(URL)
      .then(response => {
        console.log("get response:", response);
        this.setState({ smurfs: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSetData = data => {
    this.setState({ smurfs: data });
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        {/* <Smurfs smurfs={this.state.smurfs} handleSetData={this.handleSetData} /> */}

        <Route path="/" component={Header} />
        <SmurfForm handleSetData={this.handleSetData} />
        <Route
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              handleSetData={this.state.handleSetData}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
