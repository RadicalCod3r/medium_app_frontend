import Navbar from '../../components/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { wrapper } from '../../redux/store';
import { fetchArticleDetailStart, fetchRandomArticleListStart } from '../../redux/actions/articleActions';
import { END } from 'redux-saga';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../../components/custom-button';
import normalizeDate from '../../utilities/normalize-date';
import Article from '../../components/article';
import { useEffect } from 'react';


const API = 'http://localhost:8000';

const ArticleDetailPage = () => {
    const dispatch = useDispatch();

    const { article, error:errorDetail } = useSelector(state => state.articleDetail);
    const { articles:randomArticles, error:errorRandom } = useSelector(state => state.randomArticleList);

    console.log(article);

    const searchHandler = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        if (!errorDetail && article !== null && article !== {}) {
            dispatch(fetchRandomArticleListStart(article?.writer?.id));
        }
    }, [article,]);

    return (
        <div>
            <Navbar />
            { !errorDetail && article && article?.id && (
                <div className="w-full">
                    <div className="lg:w-3/4">
                        <div className="container mx-auto py-20 px-5 sm:px-10 lg:py-5 max-w-3xl lg:max-w-xl xl:max-w-2xl">
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">
                                        <Link href={`/users/${article.writer.id}`} className="rounded-full w-12 h-12 border border-gray-600 overflow-hidden">
                                            <Image src={`${API}${article.writer.image}`} alt={article.writer.name} width={72} height={72}/>
                                        </Link>
                                        <div className="flex flex-col ml-4">
                                            <div className="flex flex-row items-center">
                                                <Link href={`/users/${article.writer.id}`} className="text-gray-900 font-semibold mr-3">
                                                    { article.writer.name }
                                                </Link>
                                                <CustomButton xs secondary hoverable>Follow</CustomButton>
                                            </div>
                                            <div className='mt-1 flex flex-row items-center text-gray-500 text-xs'>
                                                <div>
                                                    { normalizeDate(article.created_at) }
                                                </div>
                                                <div className="mx-1">&#x2022;</div>
                                                <div>
                                                    { article.read_time } min read
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="rounded-full text-gray-400 px-2 py-1 flex items-center justify-center text-sm border border-gray-300 cursor-pointer hover:border-gray-400">
                                            <i class="fa-solid fa-bookmark"></i>
                                            <div className="ml-2">Save</div>
                                        </div>
                                        <i className="fa-solid fa-ellipsis cursor-pointer text-gray-900 ml-3"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="my-14">
                                <h2 className="font-bold text-3xl">{ article.title }</h2>
                                <div className="mt-5" dangerouslySetInnerHTML={{__html: article.body}} />
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block fixed top-0 right-0 bottom-0 border-l border-gray-300 lg:w-1/4" style={{ overflowY: 'auto', direction: 'rtl' }}>
                        <div className="w-full h-full py-10 lg:px-4 xl:px-6" style={{ direction: 'ltr' }}>
                            <form onSubmit={searchHandler} className="w-full border border-gray-300 rounded-full py-2 px-3 lg:text-xs xl:text-sm text-gray-900 font-semibold flex flex-row items-center">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder="Search" className="border-none focus:outline-none pl-3" />
                            </form>
                            <div className="flex flex-col mt-10 text-left items-start">
                                <div className="flex items-center justify-center mb-4">
                                    <Link href="/users/" className="w-20 h-20 rounded-full bg-gray-300 border border-gray-400 overflow-hidden">
                                        <Image src={`${API}${article.writer.image}`} alt={article.writer.name} className='object-center' width={144} height={144}/>
                                    </Link>
                                </div>
                                <div className="mx-1 flex flex-col">
                                    <Link href={`/users/${article.writer.id}`} className="text-gray-900 font-semibold">
                                        { article.writer.name }
                                    </Link>
                                    <div className="text-sm text-gray-700 my-2">{ article.writer.bio }</div>
                                    <div className="mt-8 mb-4 text-gray-900 text-sm font-semibold">More from this author</div>
                                    {
                                        !errorRandom && randomArticles && (
                                            <div className="flex flex-col">
                                                { randomArticles.slice(0, 3).map(article => (
                                                    <Article key={article.id} article={article} minimized />
                                                )) }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    );
}

export const getStaticProps = wrapper.getStaticProps(store => async ({ params }) => {
    const { id } = params;
    const articleId = id[0];

    if (articleId && articleId !== null) {
        await store.dispatch(fetchArticleDetailStart(articleId));
        await store.dispatch(END);
        await store.sagaTask.toPromise();
    } else {
        return { notFound: true };
    }

    return { revalidate: 1800 };
});

export async function getStaticPaths() {
    let paths;
    try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/v1/posts/list/');
        const articles = data;
        paths = articles ? 
            articles?.data.map(article => ({ params: { id: [article.id.toString(), article.slug.toString()] } }))
            : [{ params: { id: ['1', 'first-post'] } }];
    } catch (error) {
        paths = [{ params: { id: ['1', 'first-post'] } }];
    }

    return {
        paths,
        fallback: true
    };
}


export default ArticleDetailPage;