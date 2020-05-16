import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


// Dish Action creators
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errorMessage = new Error(error.message);
            throw errorMessage; 
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
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
export const fetchComments = () => (dispatch) => {
    dispatch(dishesLoading(true));
    fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errorMessage = new Error(error.message);
            throw errorMessage; 
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errorMessage = new Error(error.message);
        throw errorMessage; 
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
                      alert("Your comment could not be posted\nError: " + error.message);
                    });
};



// Promotions Action creators
export const fetchPromotions = () => (dispatch) => {
    dispatch(promosLoading(true));
    fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok){
                return response;
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errorMessage = new Error(error.message);
            throw errorMessage; 
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromotions(promos)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (errorMessage) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errorMessage,
});

export const addPromotions = (promos) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promos
});


// Leader Action creators
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    fetch(baseUrl + 'leaders')
        .then(response => {
            if(response.ok){
                return response;
            } else {
                const error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errorMessage = new Error(error.message);
            throw errorMessage; 
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
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