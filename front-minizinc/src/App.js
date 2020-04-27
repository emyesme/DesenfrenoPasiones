import React from 'react';
import './App.css';
import { Modal, Button,CardDeck, Card } from 'react-bootstrap';
import axios from 'axios';

const backColor = {
  backgroundColor: 'Transparent',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: '',
      data: 'No hay informacion',
      dznfile: null,
    }
    this.dznfile = this.dznfile.bind(this);
    this.execute = this.execute.bind(this);
  }
  dznfile = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    this.setState({ 'dznfile' : file})

  }
  execute = () => {
    const data = new FormData();
    data.append('dznfile', this.state.dznfile);
    axios({
      url: 'http://localhost:5000/dzn',
      method: 'POST',
      data: data,
      config: { headers: {'Content-Type':'multipart/form-data'}}
    }).then( ( response ) => this.setState({r: response.data})
    ).catch( ( error ) => console.log(error))
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
              Titulo super cool
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CardDeck>
              <Card>
                <h5>Carga tu archivo de dzn</h5>
                  <input name="dzn" type="file"  onChange={this.dznfile} />
                  <p>{this.state.data}</p>
                <Button onClick={this.execute} variant="primary">
                  Enviar
                  </Button>
              </Card>
              <Card>
                Respuesta
                  {this.state.r}
              </Card>
            </CardDeck>
          </Modal.Body>
          <Modal.Footer>
            <Button href='/' variant='danger'> Limpiar </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default App;
