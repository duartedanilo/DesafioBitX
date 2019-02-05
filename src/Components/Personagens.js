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
        registers: res.data.results
      });
    });
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
                  <a href="/detalhe">
                    <Card>
                      <Card.Header className="font-weight-bold">
                        Ver Filmes Films
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
              <Col>
                <Card>
                  <Card.Header className="font-weight-bold">
                    Starships
                  </Card.Header>

                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{person.name}</ListGroupItem>
                    <ListGroupItem>{person.name}</ListGroupItem>
                    <ListGroupItem>{person.name}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header className="font-weight-bold">
                    Species
                  </Card.Header>

                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{person.name}</ListGroupItem>
                    <ListGroupItem>{person.name}</ListGroupItem>
                    <ListGroupItem>{person.name}</ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Fragment>
        ))}
      </Container>
    );
  }
}

export default Personagens;
