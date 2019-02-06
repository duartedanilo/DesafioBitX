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
          }
        });
        await this.setState({ tipo: TIPO, nome: NAME });
      }
    } else if (TIPO === "VEICULO") {
      let vehicleAux = await sessionStorage.getItem("VEICULOS_PERSONAGEM");
      if (vehicleAux != null) {
        vehicleAux = await JSON.parse(vehicleAux);
        let vehicle = [];
        await this.setState({ count: vehicleAux.length });
        vehicleAux.forEach(async url => {
          const x = await axios.get(url);
          vehicle.push(x.data);

          await this.setState({ count: this.state.count - 1 });
          if (this.state.count <= 0) {
            await this.setState({ vehicle });
          }
        });
        await this.setState({ tipo: TIPO, nome: NAME });
      }
    } else if (TIPO === "NAVES") {
      let starshipsAux = await sessionStorage.getItem("NAVES_PERSONAGEM");
      if (starshipsAux != null) {
        starshipsAux = await JSON.parse(starshipsAux);
        let starships = [];
        await this.setState({ count: starshipsAux.length });
        starshipsAux.forEach(async url => {
          const x = await axios.get(url);
          starships.push(x.data);

          await this.setState({ count: this.state.count - 1 });
          if (this.state.count <= 0) {
            await this.setState({ starships });
          }
        });
        await this.setState({ tipo: TIPO, nome: NAME });
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
                  className="collapse"
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
            this.state.vehicle.map((x, key) => (
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
                      {x.name}
                    </button>
                  </h2>
                </div>
                <div
                  id={"data" + key}
                  className="collapse"
                  aria-labelledby={"data" + key}
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    <h6>Passageiros: {x.passengers}</h6>
                    <h6>Modelo: {x.model}</h6>
                    <h6>
                      Velocidade máxima na atmosfera: {x.max_atmosphering_speed}
                    </h6>
                    <h6>Produtor: {x.manufacturer}</h6>
                    <h6>Tamanho do veículo: {x.length}</h6>
                    <h6>Número de pilotos: {x.crew}</h6>
                    <h6>Preço em créditos: {x.cost_in_credits}</h6>
                    <h6>Capacidade: {x.cargo_capacity} Kg</h6>
                  </div>
                </div>
              </div>
            ))}
          {this.state.tipo === "NAVES" &&
            this.state.starships.map((x, key) => (
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
                      {x.name}
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
                    <h6>Passageiros: {x.passengers}</h6>
                    <h6>Modelo: {x.model}</h6>
                    <h6>
                      Velocidade máxima na atmosfera: {x.max_atmosphering_speed}
                    </h6>
                    <h6>Classe da nave: {x.starship_class}</h6>
                    <h6>Produtor: {x.manufacturer}</h6>
                    <h6>Tamanho do veículo: {x.length}</h6>
                    <h6>Número de pilotos: {x.crew}</h6>
                    <h6>Preço em créditos: {x.cost_in_credits}</h6>
                    <h6>Capacidade: {x.cargo_capacity} Kg</h6>
                    <h6>Megalights por hora: {x.MGLT}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Home;
