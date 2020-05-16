import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


// Dish Action creators
export const fetchDishes = () => (dispath) => {
    dispath(dishesLoading(true));
    fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispath(addDishes(dishes)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


// Comment Action creators
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchComments = () => (dispath) => {
    dispath(dishesLoading(true));
    fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispath(addComments(comments)));
};

export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



// Promotions Action creators
export const fetchPromotions = () => (dispath) => {
    dispath(promosLoading(true));
    fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispath(addPromotions(promos)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING,
});

export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errorMessage,
});

export const addPromotions = (promos) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promos
});


// Leader Action creators
export const fetchLeaders = () => (dispath) => {
    dispath(leadersLoading(true));
    fetch(baseUrl + 'leaders')
        .then(response => response.json())
        .then(leaders => dispath(addLeaders(leaders)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errorMessage) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errorMessage,
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});