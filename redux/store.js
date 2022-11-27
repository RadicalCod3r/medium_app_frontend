import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import { 
    articleListReducer,
    trendingListReducer,
    articleDetailReducer,
    randomArticleListReducer
} from './reducers/articleReducers';
import {
    userProfileReducer,
    signInReducer,
    logoutReducer,
    phoneValidationReducer,
    otpValidationReducer,
    signUpReducer
} from './reducers/userReducers';
import { HYDRATE } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootSaga from './sagas/rootSaga';

const combinedReducer = combineReducers({
    articleList: articleListReducer,
    trendingList: trendingListReducer,
    articleDetail: articleDetailReducer,
    randomArticleList: randomArticleListReducer,
    userProfile: userProfileReducer,
    signIn: signInReducer,
    logout: logoutReducer,
    phoneValidation: phoneValidationReducer,
    otpValidation: otpValidationReducer,
    signUp: signUpReducer,
});

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        };

        return nextState;
    } else {
        return combinedReducer(state, action);
    }
}

let userFromStorage = null;

if (typeof window !== 'undefined') {
    userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
}

let validatedPhoneFromStorage;

if (typeof window !== 'undefined') {
    validatedPhoneFromStorage = localStorage.getItem('validatedPhone') !== undefined ? JSON.parse(localStorage.getItem('validatedPhone')) : null;
}

const initialState = {
    signIn: { user: userFromStorage },
    // phoneValidation: { data: validatedPhoneFromStorage },
}

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }

    return applyMiddleware(...middleware);
}

export const makeStore = (context) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState, 
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export const wrapper = createWrapper(makeStore, { debug: true });

const store = makeStore();

export default store;