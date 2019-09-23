import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import {notes, auth} from "../actions";



class PonyNote extends Component {

    componentDidMount() {
        this.props.fetchNotes();
    }

    state = {
        title: "",
        updateNoteId: null,
    }

    resetForm = () => {
        this.setState({title: "", updateNoteId: null});
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({title: note.title, updateNoteId: id});
    }

    submitNote = (e) => {
        e.preventDefault();
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.title).then(this.resetForm)
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.title).then(this.resetForm);
        }
    }

    render() {
        return (
            <div>
              <div style={{textAlign: "right"}}>
                  {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
              </div>
              <Form onSubmit={this.submitNote}>
                <Form.Group controlId="exampleForm.ControlInput1" value={this.state.title}
                onChange={(e) => this.setState({title: e.target.value})} required>
                  <Form.Label>Название презентации</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                  <Form.Label>Выбрать презентаторов</Form.Label>
                  <Form.Control as="select" multiple>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <ButtonGroup>
                  <Button onClick={this.resetForm}>Сбросить</Button>
                  <Button type="submit">Добавить</Button>
                </ButtonGroup>
              </Form>

              <h3>Notes</h3>
              <table>
                <tbody>
                  {this.props.notes.map((note, id) => (
                    <tr key={`note_${note.id}`}>
                      <td>{note.title}</td>
                      <ButtonGroup>
                        <Button onClick={() => this.selectForEdit(id)}>edit</Button>
                        <Button onClick={() => this.props.deleteNote(id)}>delete</Button>
                      </ButtonGroup>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )
    }
}


const mapStateToProps = state => {
  console.log(state);
    return {
        notes: state.notes,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
        addNote: (title) => {
            return dispatch(notes.addNote(title));
        },
        updateNote: (id, title) => {
            return dispatch(notes.updateNote(id, title));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);
