import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';


class Eventos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventos: [],
            _id: 0, // Adicione esta linha para definir _id inicialmente como 0
            NomeEvento: '',
            Data: '',
            Horario: '',
            NomeOrg: ''
        }
    }

    componentDidMount() {
        this.mostrarEvento();
    }

    mostrarEvento() {
        fetch("http://localhost:3000/event/mostrar")
            .then(response => response.json())
            .then(dados => {
                this.setState({ eventos: dados });
            })
            .catch(error => {
                console.error("Erro ao buscar eventos:", error);
            });
    }

    deletarEvento = (_id) => {
        fetch("http://localhost:3000/event/" + _id, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    this.mostrarEvento();
                }
            })
            .catch(error => {
                console.error("Erro ao excluir evento:", error);
            });
    }

    cadastrarEvento=(evento)=>{
        fetch("http://localhost:3000/event/criar" ,{method: "POST" ,
        headers: {"content-type" : "application/json"},
        body: JSON.stringify(evento)})
        .then(response => {
            if (response.ok) {
                this.mostrarEvento();
            }
        })
        .catch(error => {
            console.error("Erro ao excluir evento:", error);
        });
    }

    uparEvento = (_id) => {
        fetch("http://localhost:3000/event/" + _id, { method: "GET" })
            .then(response => response.json())
            .then(evento =>{
                this.setState({
                    _id: evento._id,
                    NomeEvento: evento.NomeEvento,
                    Data: evento.Data,
                    Horario: evento.Horario,
                    NomeOrg: evento.NomeOrg
                })
            })
    }
    updateEvento=(evento)=>{
        fetch("http://localhost:3000/event/" +evento._id,{method: "PATCH" ,
        headers: {"content-type" : "application/json"},
        body: JSON.stringify(evento)})
        .then(response => {
            if (response.ok) {
                this.mostrarEvento();
            }
        })
        .catch(error => {
            console.error("Erro :", error);
        });
    }


    crudTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome do Evento</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Organizador</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.eventos.map((evento) => (
                        <tr key={evento._id}>
                            <td>{evento.NomeEvento}</td>
                            <td>{evento.Data}</td>
                            <td>{evento.Horario}</td> 
                            <td>{evento.NomeOrg}</td>
                            <td>
                                <Button variant="success" onClick={() => this.uparEvento(evento._id)}>Atualizar</Button>{' '}
                                <Button variant="danger" onClick={() => this.deletarEvento(evento._id)}>Excluir</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }   
    atualizaNomeEvento= (e) =>{

        this.setState({
            NomeEvento:e.target.value
        })

    }
 
        atualizaData= (e) =>{

        this.setState({
            Data:e.target.value
        })

    }
    atualizaHorario=(e)=>{
        this.setState({
            Horario:e.target.value
        })
            
    }
    atualizaNomeOrg=(e)=>{
        this.setState({
            NomeOrg:e.target.value
        })
            
    }

    enviar=()=>{
        if(this.state._id === 0){
               const evento ={
         NomeEvento:this.state.NomeEvento,
         Data:this.state.Data,
         Horario:this.state.Horario,
         NomeOrg:this.state.NomeOrg
       } 
       this.cadastrarEvento(evento)
        }else{
            const evento ={
                _id:this.state._id,
                NomeEvento:this.state.NomeEvento,
                Data:this.state.Data,
                Horario:this.state.Horario,
                NomeOrg:this.state.NomeOrg
        }
        this.updateEvento(evento)
    }
    

        
    }

    resetar=()=>{
        this.setState({
            _id: 0,  
            NomeEvento: '',
            Data: '',
            Horario: '',
            NomeOrg: ''
        })
    }

    render() {
        return (
            <div>
               


                <Form>



                <Form.Group  >
        <Form.Label>id</Form.Label>
        <Form.Control type="text"  readOnly  value={this.state._id} onChange={this.atualizaNomeEvento}/>
      </Form.Group>

      <Form.Group  >
        <Form.Label>Nome do evento</Form.Label>
        <Form.Control type="text" placeholder="digite o nome do evento"  value={this.state.NomeEvento} onChange={this.atualizaNomeEvento}/>
      </Form.Group>

      <Form.Group  >
        <Form.Label>data</Form.Label>
        <Form.Control type="text" placeholder="digite o dataa do evento" value={this.state.Data} onChange={this.atualizaData}/>
      </Form.Group>

      <Form.Group  >
        <Form.Label>horario</Form.Label>
        <Form.Control type="text" placeholder="digite o horario do evento" value={this.state.Horario}onChange={this.atualizaHorario} />
      </Form.Group>

      <Form.Group  >
        <Form.Label>Organizador do evento</Form.Label>
        <Form.Control type="text" placeholder="digite o nome organizador do evento" value={this.state.NomeOrg} onChange={this.atualizaNomeOrg}/>
      </Form.Group>

      <Form.Group >
        <Form.Check type="checkbox" label="Lembrar" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={this.enviar}>
        Salvar
      </Button>
      <Button variant="primary" type="submit" onClick={this.resetar}>
        Novo
      </Button>
    </Form> 




    {this.crudTabela()}
            </div>
        );
    }
}

export default Eventos;