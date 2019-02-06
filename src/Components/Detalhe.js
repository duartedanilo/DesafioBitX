import React, { Component } from "react";
import Header from "../Layout/Header";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      tipo: "",
      films: [],
      vehicle: [],
      starships: [],
      planet: [],
      species: [],
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
    if (TIPO === "PLANETA") {
      let homeworldAux = await sessionStorage.getItem("PLANETA_PERSONAGEM");
      if (homeworldAux != null) {
        homeworldAux = await JSON.parse(homeworldAux);
        homeworldAux = await axios.get(homeworldAux);
        let homeworld = [];
        homeworld.push(homeworldAux.data);
        await this.setState({ tipo: TIPO, nome: NAME, planet: homeworld });
      }
    } else if (TIPO === "FILME") {
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
    } else if (TIPO === "ESPECIE") {
      let especieAux = await sessionStorage.getItem("ESPECIE_PERSONAGEM");
      if (especieAux != null) {
        especieAux = await JSON.parse(especieAux);
        let especie = [];
        await this.setState({ count: especieAux.length });
        especieAux.forEach(async url => {
          const x = await axios.get(url);
          especie.push(x.data);

          await this.setState({ count: this.state.count - 1 });
          if (this.state.count <= 0) {
            await this.setState({ species: especie });
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
        <Header />
        <Container>
          <div class="d-flex align-items-center">
            <h1 className="d-inline">{this.state.nome}</h1>
            <Button
              className="ml-3 btn-danger"
              onClick={_ => this.handleBack()}
            >
              Voltar
            </Button>
          </div>

          <div className="accordion" id="accordionExample">
            {this.state.tipo === "FILME" &&
              this.state.films.map((x, key) => (
                <Divider title={x.title} indice={key}>
                  <h6>Episódio: {x.episode_id}</h6>
                  <h6>Diretor: {x.director}</h6>
                  <h6>Data de lançamento: {x.release_date}</h6>
                  <h6>Produtores: {x.producer}</h6>
                  <br />
                  <h6>Prólogo: {x.opening_crawl}</h6>
                </Divider>
              ))}
            {this.state.tipo === "VEICULO" &&
              this.state.vehicle.map((x, key) => (
                <Divider title={x.name} indice={key}>
                  <h6>Modelo: {x.model}</h6>
                  <h6>Passageiros: {x.passengers}</h6>
                  <h6>
                    Velocidade máxima na atmosfera: {x.max_atmosphering_speed}
                  </h6>
                  <h6>Produtor: {x.manufacturer}</h6>
                  <h6>Tamanho do veículo: {x.length}</h6>
                  <h6>Número de pilotos: {x.crew}</h6>
                  <h6>Preço em créditos: {x.cost_in_credits}</h6>
                  <h6>Capacidade: {x.cargo_capacity} Kg</h6>
                </Divider>
              ))}
            {this.state.tipo === "NAVES" &&
              this.state.starships.map((x, key) => (
                <Divider title={x.name} indice={key}>
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
                </Divider>
              ))}
            {this.state.tipo === "PLANETA" &&
              this.state.planet.map((x, key) => (
                <Divider title={x.name} indice={key}>
                  <h6>Nome: {x.name}</h6>
                  <h6>Clima: {x.climate}</h6>
                  <h6>Diâmetro: {x.diameter} Km</h6>
                  <h6>Gravidade: {x.gravity} </h6>
                  <h6>População: {x.population}</h6>
                  <h6>Período orbital: {x.orbital_period} dias</h6>
                  <h6>Período de rotação: {x.rotation_period} horas</h6>
                  <h6>Água na superfície: {x.surface_water}%</h6>
                  <h6>Terreno: {x.terrain}</h6>
                </Divider>
              ))}
            {this.state.tipo === "ESPECIE" &&
              this.state.species.map((x, key) => (
                <Divider title={x.name} indice={key}>
                  <h6>Nome: {x.name}</h6>
                  <h6>Idioma: {x.language}</h6>
                  <h6>Cores de cabelo: {x.hair_colors}</h6>
                  <h6>Cores de olhos: {x.eye_colors}</h6>
                  <h6>Designação: {x.designation}</h6>
                  <h6>Classificação: {x.classification}</h6>
                  <h6>Tempo de vida médio: {x.average_lifespan} anos</h6>
                  <h6>Altura média: {x.average_height} cm</h6>
                </Divider>
              ))}
          </div>
        </Container>
      </div>
    );
  }
}

class Divider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">
            <button
              className="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target={"#data" + this.props.indice}
              aria-expanded="true"
              aria-controls={"data" + this.props.indice}
            >
              {this.props.title}
              {console.log(this.props)}
            </button>
          </h2>
        </div>
        <div
          id={"data" + this.props.indice}
          className="collapse"
          aria-labelledby={"data" + this.props.indice}
          data-parent="#accordionExample"
        >
          <div className="card-body">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Home;
