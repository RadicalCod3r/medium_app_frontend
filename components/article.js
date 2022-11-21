import Link from 'next/link';
import Image from 'next/image';
import normalizeDate from '../utilities/normalize-date';
import classes from './article.module.css';

const API = 'http://localhost:8000';

const Article = ({ article, minimized }) => {
    return (
        <div className="flex items-center justify-between mb-5 xl:mb-10">
            <div className="w-3/4 lg:w-1/2 flex flex-col">
                <div className="flex flex-row items-center">
                    <Link href={`/users/${article.writer.id}`} className="rounded-full w-8 h-8 border border-gray-600 overflow-hidden">
                        <Image className="object-center object-cover" src={`${API}${article.writer.image}`} alt={article.writer.name} width={72} height={72} />
                    </Link>
                    <Link href={`/users/${article.writer.id}`} className="text-xs text-gray-900 font-semibold ml-2">
                        { article.writer.name }
                    </Link>
                </div>
                <Link href={`/articles/${article.id}/${article.slug}/`} className={`font-bold text-sm mt-2 leading-tight ${classes.wrapText}`}>
                    { article.title }
                </Link>
                <div className={`${minimized === true && 'hidden'} text-gray-500 text-sm`}>
                    { article.caption }
                </div>
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
            <div className="w-1/4 lg:w-1/2 flex" style={{ height: '100px' }}>
                <Image className="object-center object-cover ml-5" src={`${API}${article.image}`} width={300} height={250} />
            </div>
        </div>
    );
}

export default Article;