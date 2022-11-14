import Head from 'next/head';
import CustomLink from '../components/custom-link';
import Navbar from '../components/navbar';
import TrendingArticle from '../components/trending';
import { wrapper } from '../redux/store';
import { fetchArticlesStart, fetchTrendingStart } from '../redux/actions/articleActions';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import Article from '../components/article';
import InfiniteArticleList from '../components/infinite-article-list';


export default function Home() {
  const { trending, error:errorTrending } = useSelector(state => state.trendingList);
  const { articles, error:errorArticles } = useSelector(state => state.articleList);

  console.log(articles);
  console.log(trending);

  return (
    <div>
      <Navbar home />
      <section id="hero" className="bg-yellow-500 flex flex-col justify-center px-6 border-b border-gray-900" style={{ height: '60vh', marginTop: '70px' }}>
        <div className="sm:w-3/4 lg:w-1/2 mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
          <div>
            <h1 className='font-semibold text-5xl sm:text-6xl tracking-tight'>Stay Curious.</h1>
            <p className='text-gray-800 text-xl font-semibold leading-tight my-7'>Discover stories, thinking, and expertise from writers on any topic.</p>
            <CustomLink href='#' hoverable>Start reading</CustomLink>
          </div>
        </div>
      </section>
      <section id="trending" className="py-10 px-6 flex flex-col border-b border-gray-300">
        <div className="container mx-auto">
          <div className="flex items-center">
            <span className='rounded-full border-2 border-gray-900 w-5 h-5 flex justify-center items-center'>
              <i className="fa-solid fa-arrow-trend-up fa-xs"></i>
            </span>
            <span className='tracking-widest text-gray-800 text-xs font-bold mx-2'>
              TRENDING ON MEDIUM
            </span>
          </div>          
          <div className="flex flex-col mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              !errorTrending && trending?.data?.slice(0, 6).map((article, i) => (
                <TrendingArticle key={article.id} article={article} i={i} />
              ))
            }
          </div>
        </div>
      </section>
      <section id="main" className="px-6">
        <div className="container mx-auto">
          <div className="py-6 flex flex-col w-full lg:w-2/3">
            {
              !errorArticles && articles?.data && (
                <InfiniteArticleList data={articles.data} count={articles.count} />
              )
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ req, res }) => {
  await store.dispatch(fetchArticlesStart());
  await store.dispatch(fetchTrendingStart());
  await store.dispatch(END);
  await store.sagaTask.toPromise();

  return {
    revalidate: 300
  }
});