import constants from '../constants/articleConstants';

export const articleListReducer = (state = { articles: null, error: null }, action) => {
    switch (action.type) {
        case constants.FETCH_ARTICLES_SUCCEED:
            return { ...state, articles: action.payload };
        case constants.FETCH_ARTICLES_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const trendingListReducer = (state = { trending: null, error: null }, action) => {
    switch (action.type) {
        case constants.FETCH_ARTICLES_SUCCEED:
            return { ...state, trending: action.payload };
        case constants.FETCH_TRENDING_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export const articleDetailReducer = (state = { article: null, error: null }, action) => {
    switch (action.type) {
        case constants.FETCH_ARTICLE_DETAIL_SUCCEED:
            return { ...state, article: action.payload };
        case constants.FETCH_ARTICLE_DETAIL_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}