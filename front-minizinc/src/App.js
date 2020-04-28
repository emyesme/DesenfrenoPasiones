import React from 'react';
import './App.css';
import { Modal, Button, CardDeck, Card, Form } from 'react-bootstrap';
import axios from 'axios';

const backColor = {
  backgroundColor: 'Transparent',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: '',
      model: -1,
      data: 'No hay informacion',
      dznfile: null,
    }
    this.dznfile = this.dznfile.bind(this);
    this.execute = this.execute.bind(this);
  }
  dznfile = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    this.setState({ 'dznfile': file })

  }
  execute = () => {
    if (this.state.model === -1) {
      alert("No se ha escogido un modelo")
    } else {
      const data = new FormData();
      data.append('dznfile', this.state.dznfile);
      axios({
        url: 'http://localhost:5000/dzn',
        method: 'POST',
        data: data,
        params: { model : this.state.model },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then((response) => {
        if(response.data === ""){
          alert("Se ha producido un error. Es posible que la causa sea la selección de un modelo incorrecto");
        }else{
          this.setState({ r: response.data })
        }}
      ).catch((error) => alert("Se ha producido un error. Es posible que la causa sea la selección de un modelo incorrecto"))
    }

  }
  clean = (event) => {
    event.preventDefault();
    this.setState({ r: '', dznfile: null });
  }
  setModel = (data) => {
    console.log(data)
    this.setState({ model: data });
    console.log(this.state.model)
  }
  render() {
    return (
      <div className="App" style={backColor}>
        <Modal.Dialog
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Desenfreno de Pasiones
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CardDeck>
              <Card>
                <h5>Carga tu archivo de dzn</h5>
                <input name="dzn" type="file" onChange={this.dznfile} />
                {/*<p>{this.state.data}</p>*/}
                <Form.Check
                  type="radio"
                  label="Modelo 1"
                  name="formHorizontalRadios"
                  id="Modelo1"
                  onClick={() => this.setModel(0)}
                />
                <Form.Check
                  type="radio"
                  label="Modelo 2"
                  name="formHorizontalRadios"
                  id="Modelo2"
                  onClick={() => this.setModel(1)}
                />
                <Button onClick={this.execute} variant="primary">
                  Enviar
                  </Button>
              </Card>
              <Card>
                {this.state.r}
              </Card>
            </CardDeck>
          </Modal.Body>
          <Modal.Footer>
            <Button href='/' variant='danger' onClick={this.clean}> Limpiar </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default App;
