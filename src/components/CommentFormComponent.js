import React, { Component } from 'react';
import { Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCommentFormOpen : false
        }
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentForm =() => {
        this.setState({isCommentFormOpen : !this.state.isCommentFormOpen})
    };

    handleSubmit = (values) => {
        this.toggleCommentForm();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div>
                <div>
                    <Control.button model=".submitButton" className="btn btn-secondary" name="submitComment" onClick={this.toggleCommentForm}>
                        <span className="fa fa-pencil">Submit Comment</span>
                    </Control.button>
                </div>    
                <div className="col-12 md-5">
                    <Modal isOpen={this.state.isCommentFormOpen} toggle={this.toggleCommentForm}>
                        <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label model=".rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" className="form-control">
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" name="author" 
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength:minLength(3),
                                            maxLength:maxLength(15)
                                        }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>    
                                        <Control.textarea rows={6} model=".comment" name="comment" 
                                        className="form-control"/>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={10}>
                                        <Control.button model=".submit" className="btn btn-primary" 
                                            value="submit">Submit</Control.button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }       
}

export default CommentForm;