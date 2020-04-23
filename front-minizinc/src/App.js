import React from 'react';
import './App.css';
import { Modal, Button, Form, CardDeck, Card } from 'react-bootstrap';

const backColor = {
  backgroundColor: 'Transparent',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      r: '',
      dznfile: '',
    }
    this.dznfile = this.dznfile.bind(this);
    this.execute = this.execute.bind(this);
  }
  dznfile = (event) => {
    event.preventDefault();
    let files = event.target.files;
    if (files && files.length > 0) {
      this.setState({ dznfile: files });
    }
    else
      console.log("no hay archivo");
  }
  execute = () => {
//../../../MiniZincIDE-2.3.2-bundle-linux-x86_64/MiniZincIDE-2.3.2-bundle-linux/bin/minizinc --solver Gecode /home/esmeralda/Desktop/DesenfrenoPasiones/minizinc/DesenfrenoDePasiones.mzn /home/esmeralda/Desktop/DesenfrenoPasiones/minizinc/Trivial2.dzn

    //var sh = require('shelljs');
    //var path = require('path');
    //sh.config.execPath = path.join('home', 'esmeralda', 'Desktop', 'DesenfrenoPasiones', 'front-minizinc', 'src');
    //var output = sh.exec('ls');
    //console.log(sh.exec("ls"));
    // if (sh.exec('ls').code !== 0) {
    //   sh.echo('Error: ls failed');
    //   sh.exit(1);
    // }
    //var version = sh.exec('ls -a', {silent:true}).stdout;
    this.setState({ r: 'funciona...' });
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
                  Carga tu archivo de dzn
                  <Form.Group>
                    <Form.Label>Archivo dzn</Form.Label>
                    <Form.Control name="dzn[]" type="file" multiple onChange={this.dznfile} />
                  </Form.Group>
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
