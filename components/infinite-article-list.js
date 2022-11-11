import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';
import Article from "./article";
import axios from 'axios';
import Loader from './loader';

const InfiniteArticleList = ({ data, count }) => {
    const [articles, setArticles] = useState(data);
    const [hasMore, setHasMore] = useState(true);

    const calculatePageNumber = (pageSize, itemIndex) => {
        return Math.ceil(++itemIndex / pageSize);
    };

    const getMoreArticles = async () => {
        if (articles.length < count) {
            let pageNumber = 1;

            if (articles.length > 0) {
                pageNumber = calculatePageNumber(10, articles.length - 1);
            }
    
            console.log(pageNumber + 1);
    
            const { data:newArticles } = await axios.get(`http://127.0.0.1:8000/api/v1/posts/list?page=${pageNumber + 1}`);
            setArticles([...articles, ...newArticles?.data]);
        } else {
            setHasMore(false);
        }
    }

    return (
        <InfiniteScroll
            dataLength={articles.length}
            next={getMoreArticles}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={<h4>Nothing more to show</h4>}
        >
            { articles && articles !== [] && articles.map(article => (
              <Article key={article.id} article={article} />
            )) }
        </InfiniteScroll>
    );
}

export default InfiniteArticleList;