import React, { Component, Fragment } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Jumbotron from "react-bootstrap/Jumbotron";

class Personagens extends Component {
  state = {
    nome: "",
    showResults: false,
    registers: [],
    films: []
  };

  handleChange(e) {
    this.setState({
      nome: e.target.value
    });
  }

  procuraPersonagem = () => {
    let personagem = this.state.nome;
    //let personagem = "luke";
    axios.get("https://swapi.co/api/people/?search=" + personagem).then(res => {
      this.setState({
        showResults: true,
        registers: res.data.results,
        films: res.data.results.films
      });
    });
  };

  handleDetalhe = async (nome, dt, tipo) => {
    const data = await JSON.stringify(dt);
    await sessionStorage.setItem("NOME_PERSONAGEM", nome);
    if (tipo === "FILME")
      await sessionStorage.setItem("FILMES_PERSONAGEM", data);
    else if (tipo === "VEICULO")
      await sessionStorage.setItem("VEICULOS_PERSONAGEM", data);
    else if (tipo === "NAVES")
      await sessionStorage.setItem("NAVES_PERSONAGEM", data);
    else if (tipo === "PLANETA")
      await sessionStorage.setItem("PLANETA_PERSONAGEM", data);
    else if (tipo === "ESPECIE")
      await sessionStorage.setItem("ESPECIE_PERSONAGEM", data);
    await sessionStorage.setItem("TIPO", tipo);

    document.location.href = document.location.origin + "/detalhe";
  };

  render() {
    return (
      <Container>
        <div className="mt-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nome do personagem</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do personagem"
              onChange={this.handleChange.bind(this)}
              onEnter={this.procuraPersonagem}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.procuraPersonagem}>
            Enviar
          </Button>
        </div>

        {this.state.registers.map(person => (
          <Jumbotron className="mt-4 py-4">
            <h1>{person.name}</h1>
            <Row>
              <Col xs={6} md={9}>
                <Card>
                  <Card.Header className="font-weight-bold">
                    Informações pessoais
                  </Card.Header>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Data de nascimento: {person.birth_year}
                    </ListGroupItem>
                    <ListGroupItem>
                      Cor do olho: {person.eye_color}
                    </ListGroupItem>
                    <ListGroupItem>Gênero: {person.gender}</ListGroupItem>
                    <ListGroupItem>
                      Cor do cabelo: {person.hair_color}
                    </ListGroupItem>
                    <ListGroupItem>Altura: {person.height}</ListGroupItem>
                    <ListGroupItem>Peso: {person.mass}</ListGroupItem>
                    <ListGroupItem>
                      Cor da pele: {person.skin_color}
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
              <Col>
                {person.films.length > 0 && (
                  <Button
                    className="btn-block"
                    onClick={_ =>
                      this.handleDetalhe(person.name, person.films, "FILME")
                    }
                  >
                    Ver Filmes
                  </Button>
                )}
                {person.vehicles.length > 0 && (
                  <Button
                    className="btn-block"
                    onClick={_ =>
                      this.handleDetalhe(
                        person.name,
                        person.vehicles,
                        "VEICULO"
                      )
                    }
                  >
                    Ver veículos
                  </Button>
                )}
                {person.starships.length > 0 && (
                  <Button
                    className="btn-block"
                    onClick={_ =>
                      this.handleDetalhe(person.name, person.starships, "NAVES")
                    }
                  >
                    Ver naves
                  </Button>
                )}

                <Button
                  className="btn-block"
                  onClick={_ =>
                    this.handleDetalhe(person.name, person.homeworld, "PLANETA")
                  }
                >
                  Ver planeta
                </Button>

                {person.species.length > 0 && (
                  <Button
                    className="btn-block"
                    onClick={_ =>
                      this.handleDetalhe(person.name, person.species, "ESPECIE")
                    }
                  >
                    Ver espécie
                  </Button>
                )}
              </Col>
            </Row>
          </Jumbotron>
        ))}
      </Container>
    );
  }
}

export default Personagens;
