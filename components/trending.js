import Image from 'next/image';
import Link from 'next/link';
import normalizeDate from '../utilities/normalize-date';
  
const API = 'http://localhost:8000';

const TrendingArticle = ({ article, i }) => {
    return (
        <div key={article.id} className="flex mb-3">
            <div className="text-gray-300 font-bold text-3xl">
            0{ i + 1 }
            </div>
            <div className="flex flex-col ml-3">
                <div className="flex items-center">
                    <Link href={`/users/${article.writer.username}`} className="rounded-full w-8 h-8 border border-gray-600 overflow-hidden">
                        <Image src={`${API}${article.writer.image}`} alt={article.writer.username} width={72} height={72}/>
                    </Link>
                    <Link href={`/users/${article.writer.username}`} className="text-xs text-gray-900 font-semibold ml-2">
                    { article.writer.username }
                    </Link>
                </div>
                <Link href={`/posts/${article.id}/${article.slug}/`} className="font-bold text-sm mt-2 leading-tight">
                    { article.title }
                </Link>
                <div className='mt-2 flex items-center text-gray-500 text-xs'>
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
    );
}

export default TrendingArticle;