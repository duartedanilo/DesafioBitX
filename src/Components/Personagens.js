import React, { Component } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class Personagens extends Component {
  state = {
    nome: "",
    showResults: false
  };

  handleChange(e) {
    this.setState({
      nome: e.target.value
    });
  }

  procuraPersonagem = () => {
    //let personagem = this.state.nome;
    let personagem = "luke";
    axios.get("https://swapi.co/api/people/?search=" + personagem).then(res => {
      this.setState({
        showResults: true
      });
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
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
      </Container>
    );
  }
}

export default Personagens;
