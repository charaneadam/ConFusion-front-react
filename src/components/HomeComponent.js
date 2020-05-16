import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

function RenderCard({ item, ...props }) {
  if (props.isLoading) {
    return (
      <Loading />
    );
  } else if (props.errorMessage) {
    return (
      <h4>{props.errorMessage}</h4>
    );
  }
  else return (
    <Card key={item.id}>
      <CardImg src={baseUrl + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errorMessage={props.dishesErrorMessage} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promotionsLoading}
            errorMessage={props.promotionsErrorMessage} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leadersLoading}
            errorMessage={props.leadersErrorMessage} />
        </div>
      </div>
    </div>
  );
}

export default Home;