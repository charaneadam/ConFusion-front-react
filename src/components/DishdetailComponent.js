import React, { Component } from "react";
import {
  Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem,
  Button, Modal, ModalHeader, ModalBody, Row, Col
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

const formatDate = (date) => {
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

class RenderComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log("current state is : " + JSON.stringify(values));
    alert("current state is : " + JSON.stringify(values));
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {

    const SubmitCommentModal = () => {
      return (
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <Row><Col>Rating</Col></Row>
              <Row className="form-group">
                <Col>
                  <Control.select model=".rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row><Col>Your name</Col></Row>
              <Row className="form-group">
                <Col>
                  <Control.text model=".author" name="author" className="form-control"
                    validators={{required, maxLength:maxLength(15), minLength:minLength(3)}} />
                    <Errors className="text-danger" model=".author" show="touched" messages={{
                    required: "Required",
                    minLength: "Must be greater than 3 characters",
                    maxLength: "Must be 15 characters or less"
                  }} />
                </Col>
              </Row>

              <Row><Col>Comment</Col></Row>
              <Row className="form-group">
                <Col>
                  <Control.textarea model=".comment" name="comment" className="form-control" rows="6" />
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">Submit</Button>
                </Col>
              </Row>

            </LocalForm>
          </ModalBody>
        </Modal>
      )
    }

    const comments = this.props.comments;
    if (comments != null) {
      let list = comments.map((comments) => {
        let date = comments.date
        return (
          <li key={comments.id} >
            <div>
              <p>{comments.comment}</p>
              <p>--{comments.author},{formatDate({ date })}</p>
            </div>
          </li>
        )
      })
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {list}
          </ul>
          <Button outline onClick={this.toggleModal}>
            <i className="fa fa-pencil" aria-hidden="true"></i> Submit comment
          </Button>
          <SubmitCommentModal />
        </div>
      )
    }
    else {
      return (
        <div>
          <Button outline onClick={this.toggleModal}>
            <i className="fa fa-pencil" aria-hidden="true"></i> Submit comment
          </Button>
          <SubmitCommentModal />
        </div>
      )
    }
  }
}

function Dishdetail({ dish, comments, addComment, isLoading, errorMessage }) {
  if(isLoading){
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if(errorMessage){
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{errorMessage}</h4>
          </div>
        </div>
      </div>
    );
  }
  return dish ? (
    <div className="container">

      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3><hr />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={comments} addComment={addComment} dishId={dish.id} />
        </div>
      </div>
    </div>
  ) : (
      <div></div>
    )
}

export default Dishdetail;