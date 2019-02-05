import React, { Component } from "react";

import Header from "../Layout/Header";

class Home extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleBack = _ => {
    const back = document.location.origin + "/";
    document.location = back;
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        Detalhe
        <button onClick={_ => this.handleBack()}>Voltar</button>
      </div>
    );
  }
}

export default Home;
