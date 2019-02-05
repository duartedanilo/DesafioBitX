import React, { Component } from "react";

import Header from "../Layout/Header";
import axios from "axios";

import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      tipo: "",
      films: [],
      vehicle: [],
      starships: [],
      planet: {},
      species: {},
      count: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleBack = _ => {
    const back = document.location.origin + "/";
    document.location = back;
  };
  componentDidMount = () => {
    console.log(this.state.films);
  };
  componentWillUnmount = async () => {
    //await sessionStorage.clear();
  };

  componentWillMount = async _ => {
    const TIPO = await sessionStorage.getItem("TIPO");
    const NAME = await sessionStorage.getItem("NOME_PERSONAGEM");
    if (TIPO === "FILME") {
      let filmsAux = await sessionStorage.getItem("FILMES_PERSONAGEM");
      if (filmsAux != null) {
        filmsAux = await JSON.parse(filmsAux);
        let films = [];
        await this.setState({ count: filmsAux.length });
        filmsAux.forEach(async url => {
          const x = await axios.get(url);
          films.push(x.data);

          await this.setState({ count: this.state.count - 1 });
          if (this.state.count <= 0) {
            await this.setState({ films });
            console.log(this.state.count);
            console.log(this.state.films);
          }
        });
        await this.setState({ tipo: TIPO, nome: NAME });
      }
    } else if (TIPO === "VEICULO") {
      let vehicles = await sessionStorage.getItem("VEICULOS_PERSONAGEM");
      if (vehicles != null) {
        vehicles = await JSON.parse(vehicles);
        await this.setState({ tipo: TIPO, nome: NAME, vehicles });
      }
    } else if (TIPO === "NAVES") {
      let starships = await sessionStorage.getItem("NAVES_PERSONAGEM");
      if (starships != null) {
        starships = await JSON.parse(starships);
        await this.setState({ tipo: TIPO, nome: NAME, starships });
      }
    }
    console.log(this.state);
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <h1>{this.state.nome}</h1>
        Detalhe
        <button onClick={_ => this.handleBack()}>Voltar</button>
        <div className="accordion" id="accordionExample">
          {this.state.tipo === "FILME" &&
            this.state.films.map((x, key) => (
              <div key={key} className="card">
                <div className="card-header">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target={"#data" + key}
                      aria-expanded="true"
                      aria-controls={"data" + key}
                    >
                      {x.title}
                    </button>
                  </h2>
                </div>
                <div
                  id={"data" + key}
                  className="collapse show"
                  aria-labelledby={"data" + key}
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    <h6>Episódio: {x.episode_id}</h6>
                    <h6>Diretor: {x.director}</h6>
                    <h6>Data de lançamento: {x.release_date}</h6>
                    <h6>Produtores: {x.producer}</h6>
                    <br />
                    <h6>Prólogo: {x.opening_crawl}</h6>
                  </div>
                </div>
              </div>
            ))}
          {this.state.tipo === "VEICULO" &&
            this.state.vehicle.map(x => (
              <div>
                <a>{x.name}</a>
              </div>
            ))}
          {this.state.tipo === "NAVES" &&
            this.state.starships.map(x => (
              <div>
                <a>{x.name}</a>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Home;
