import React, { Component } from "react";

import Header from "../Layout/Header";
import Personagens from "../Components/Personagens";

class Home extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <Header />
        <Personagens />
      </div>
    );
  }
}

export default Home;
