import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux';
import { 
    articleListReducer,
    trendingListReducer
} from './reducers/articleReducers';
import { HYDRATE } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootSaga from './sagas/rootSaga';

const combinedReducer = combineReducers({
    articleList: articleListReducer,
    trendingList: trendingListReducer
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

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }

    return applyMiddleware(...middleware);
}

export const makeStore = (context) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export const wrapper = createWrapper(makeStore, { debug: true });

const store = makeStore();

export default store;