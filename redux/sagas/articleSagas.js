import { takeEvery, put, call, all } from 'redux-saga/effects';
import constants from '../constants/articleConstants';
import {
    fetchArticlesSuccess,
    fetchArticlesFail,

    fetchTrendingSuccess,
    fetchTrendingFail,

    fetchArticleDetailSuccess,
    fetchArticleDetailFail,

    fetchRandomArticleListSuccess,
    fetchRandomArticleListFail,
} from '../actions/articleActions';
import axios from 'axios';


const BASE_URL = 'http://127.0.0.1:8000/api/v1/posts'; 

function* fetchArticlesAsync() {
    try {
        const { data } = yield axios.get(`${BASE_URL}/list?page=1`);
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

function* fetchDetailAsync(action) {
    try {
        const { data } = yield axios.get(`${BASE_URL}/${action.payload}`);
        yield put(fetchArticleDetailSuccess(data));
    } catch (error) {
        yield put(fetchArticleDetailFail(error));
    }
}

function* fetchRandomAsync(action) {
    try {
        const { data } = yield axios.get(`${BASE_URL}/random-posts-by-authorid/${action.payload}/`);
        yield put(fetchRandomArticleListSuccess(data));
    } catch (error) {
        yield put(fetchRandomArticleListFail(error))
    }
}

function* articleListSaga() {
    yield takeEvery(constants.FETCH_ARTICLES_STARTED, fetchArticlesAsync);
}

function* trendingListSaga() {
    yield takeEvery(constants.FETCH_TRENDING_STARTED, fetchTrendingAsync);
}

function* articleDetailSaga() {
    yield takeEvery(constants.FETCH_ARTICLE_DETAIL_STARTED, fetchDetailAsync);
}

function* randomArticleListSaga() {
    yield takeEvery(constants.FETCH_RANDOM_ARTICLES_STARTED, fetchRandomAsync);
}

function* articleSaga() {
    yield all([
        call(articleListSaga),
        call(trendingListSaga),
        call(articleDetailSaga),
        call(randomArticleListSaga),
    ]);
}

export default articleSaga;