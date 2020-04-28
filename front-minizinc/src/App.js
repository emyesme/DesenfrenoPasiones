import React from 'react';
import './App.css';
import { Modal, Button, CardDeck, Card, Form, Alert } from 'react-bootstrap';
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
      escenas: [],
    }
    this.dznfile = this.dznfile.bind(this);
    this.execute = this.execute.bind(this);
    this.formatdata = this.formatdata.bind(this);
  }
  formatdata = (text) => {
    this.setState({data: ""});
    var result = "";
    var all = text.split("\n");
    if (all[0].includes("ACTORES =")) {
      const actores = all[0].split(",").length;
      result += "Actores: " + actores + ",    ";
      /*var index = all.indexOf(all.find(res => res.includes("Escenas =")));
       for (var i=index; i<index+actores; i++ ){
        result += all[i] + "\n";
      } */
      var disponibilidad = all.find(res => res.includes("Disponibilidad ="));
      var evitar = all.find(res => res.includes("Evitar ="));
      if (( typeof disponibilidad !== "undefined" ) && ( typeof evitar !== "undefined" )){
        result += "Deberias usar el Modelo 2\n";
      }else{
        result += "Deberias usar el Modelo 1\n";
      }
    }else{
      result= "No hay información";
    }
    console.log(result);
    return result;
  }
  dznfile = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    this.setState({ 'dznfile': file })
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = reader.result;
      const inf = this.formatdata(text);
      console.log(inf);
      this.setState({ data: inf });
    };
    reader.readAsText(event.target.files[0]);

  }
  execute = () => {
    if (this.state.model === -1 || this.state.dznfile === null) {
      alert("No se ha escogido un modelo o un archivo")
    } else {
      const data = new FormData();
      data.append('dznfile', this.state.dznfile);
      axios({
        url: 'http://localhost:5000/dzn',
        method: 'POST',
        data: data,
        params: { model: this.state.model },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then((response) => {
        if (response.data === "") {
          alert("Se ha producido un error. Es posible que la causa sea la selección de un modelo incorrecto");
        } else {
          const result =  response.data;
          this.setState({ r: result.substring(0,result.length - 22) });
        }
      }
      ).catch((error) => alert("Se ha producido un error. Es posible que la causa sea la selección de un modelo incorrecto"))
    }

  }
  clean = (event) => {
    event.preventDefault();
    this.setState({ r: '', dznfile: null, model: -1, data: "No hay información" });
  }
  setModel = (data) => {
    this.setState({ model: data });
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
                <h5>Carga tu archivo dzn</h5>
                <input name="dzn" type="file" onChange={this.dznfile} />
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
                <br></br>
                <Button onClick={this.execute} variant="primary">
                  Enviar
                </Button>
                
                <Alert variant={"info"}>
                {this.state.data}
                </Alert>
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
