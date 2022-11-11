import articleConstants from '../constants/articleConstants';


export const fetchArticlesStart = () => ({
    type: articleConstants.FETCH_ARTICLES_STARTED
});

export const fetchArticlesSuccess = (articles) => ({
    type: articleConstants.FETCH_ARTICLES_SUCCEED,
    payload: articles
});

export const fetchArticlesFail = (error) => ({
    type: articleConstants.FETCH_ARTICLES_FAILED,
    payload: error
});

export const fetchTrendingStart = () => ({
    type: articleConstants.FETCH_TRENDING_STARTED
});

export const fetchTrendingSuccess = (trending) => ({
    type: articleConstants.FETCH_TRENDING_SUCCEED,
    payload: trending
});

export const fetchTrendingFail = (error) => ({
    type: articleConstants.FETCH_TRENDING_FAILED,
    payload: error
});