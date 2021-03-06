import React, { Component } from 'react'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';

import { postComment, fetchDishes, fetchComments, fetchPromotions, fetchLeaders, postFeedback } from '../redux/ActionCreators';

const mapStoreToprops = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
};

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstName, lastName, telnum, email, agree, contactType, message) => dispatch(
    postFeedback(firstName, lastName, telnum, email, agree, contactType, message)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromotions: () => {dispatch(fetchPromotions())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
});

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return (
        <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrorMessage={this.props.dishes.errorMessage}

          promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]} 
          promotionsLoading={this.props.promotions.isLoading}
          promotionsErrorMessage={this.props.promotions.errorMessage}

          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
          leadersLoading={this.props.leaders.isLoading}
          leadersErrorMessage={this.props.leaders.errorMessage}

        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <Dishdetail 
          dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errorMessage={this.props.dishes.errorMessage}
          
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrorMessage={this.props.comments.errorMessage}
          postComment={this.props.postComment}
          />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route exact path="/contactus" component={() => <Contact
                                                            resetFeedbackForm={this.props.resetFeedbackForm}
                                                            postFeedback={this.props.postFeedback} />} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }

}

export default withRouter(connect(mapStoreToprops, mapDispatchToProps)(Main));
