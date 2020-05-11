import React from "react";
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";


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
        <CardImg width="100%" src={dish.image} alt={dish.name} />
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

const RenderComments = ({ comments }) => {
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
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

function Dishdetail({ dish }) {
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
          <RenderComments comments={dish.comments} />
        </div>
      </div>
    </div>
  ) : (
      <div></div>
    )
}

export default Dishdetail;