import { takeEvery, put, call, all } from 'redux-saga/effects';
import constants from '../constants/articleConstants';
import {
    fetchArticlesSuccess,
    fetchArticlesFail,
    fetchTrendingSuccess,
    fetchTrendingFail
} from '../actions/articleActions';
import axios from 'axios';


const BASE_URL = 'http://127.0.0.1:8000/api/v1/posts'; 

function* fetchArticlesAsync() {
    try {
        const { data } = yield axios.get(`${BASE_URL}/list/`);
        yield put(fetchArticlesSuccess(data));
    } catch (error) {
        yield put(fetchArticlesFail(error));
    }
}

function* fetchTrendingAsync() {
    try {
        const { data } = yield axios.get(`${BASE_URL}/list/trending/`);
        yield put(fetchTrendingSuccess(data));
    } catch (error) {
        yield put(fetchTrendingFail(error));
    }
}

function* articleListSaga() {
    yield takeEvery(constants.FETCH_ARTICLES_STARTED, fetchArticlesAsync);
}

function* trendingListSaga() {
    yield takeEvery(constants.FETCH_TRENDING_STARTED, fetchTrendingAsync);
}

function* articleSaga() {
    yield all([
        call(articleListSaga),
        call(trendingListSaga),
    ]);
}

export default articleSaga;