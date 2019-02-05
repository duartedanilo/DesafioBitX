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
    await sessionStorage.setItem("TIPO", tipo);

    document.location.href = document.location.origin + "/detalhe";
  };

  render() {
    return (
      <Container fluid>
        <Row className="mt-3">
          <Col>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nome do personagem</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do personagem"
                  onChange={this.handleChange.bind(this)}
                />
              </Form.Group>
              <Button variant="primary" onClick={this.procuraPersonagem}>
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>

        {this.state.registers.map(person => (
          <Fragment>
            <h1 className="mt-3">{person.name}</h1>
            <Row>
              <Col>
                <Card>
                  <Card.Header className="font-weight-bold">
                    Personal information
                  </Card.Header>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Bith date: {person.birth_year}
                    </ListGroupItem>
                    <ListGroupItem>Eye color: {person.eye_color}</ListGroupItem>
                    <ListGroupItem>Gender: {person.gender}</ListGroupItem>
                    <ListGroupItem>
                      Hair color: {person.hair_color}
                    </ListGroupItem>
                    <ListGroupItem>Height: {person.height}</ListGroupItem>
                    <ListGroupItem>Mass: {person.mass}</ListGroupItem>
                    <ListGroupItem>
                      Skin color: {person.skin_color}
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
              {person.films.length > 0 && (
                <Col>
                  <a
                    onClick={_ =>
                      this.handleDetalhe(person.name, person.films, "FILME")
                    }
                  >
                    <Card>
                      <Card.Header className="font-weight-bold">
                        Ver Filmes
                      </Card.Header>
                      {/*  <ListGroup className="list-group-flush">
                    {person.films.map(film => (
                      <ListGroupItem>{film}</ListGroupItem>
                    ))}
                  </ListGroup>*/}
                    </Card>
                  </a>
                </Col>
              )}
              {person.vehicles.length > 0 && (
                <Col>
                  <a
                    onClick={_ =>
                      this.handleDetalhe(
                        person.name,
                        person.vehicles,
                        "VEICULO"
                      )
                    }
                  >
                    <Card>
                      <Card.Header className="font-weight-bold">
                        Ver veículos
                      </Card.Header>
                      {/*  <ListGroup className="list-group-flush">
                    {person.films.map(film => (
                      <ListGroupItem>{film}</ListGroupItem>
                    ))}
                  </ListGroup>*/}
                    </Card>
                  </a>
                </Col>
              )}
              {person.starships.length > 0 && (
                <Col>
                  <a
                    onClick={_ =>
                      this.handleDetalhe(person.name, person.starships, "NAVES")
                    }
                  >
                    <Card>
                      <Card.Header className="font-weight-bold">
                        Ver naves
                      </Card.Header>
                      {/*  <ListGroup className="list-group-flush">
                    {person.films.map(film => (
                      <ListGroupItem>{film}</ListGroupItem>
                    ))}
                  </ListGroup>*/}
                    </Card>
                  </a>
                </Col>
              )}
            </Row>
          </Fragment>
        ))}
      </Container>
    );
  }
}

export default Personagens;
