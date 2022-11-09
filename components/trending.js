import Image from 'next/image';
import Link from 'next/link';

  
const API = 'http://localhost:8000';

const imageLoader = (src) => {
    return `${API}${src}`;
}

const normalizeDate = (datetime) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec']
  
    const date = new Date(datetime);
    return `${months[date.getMonth()]} ${date.getDay() - 1}`
} 

const TrendingPost = ({ post, i }) => {
    return (
        <div key={post.id} className="flex mb-3">
            <div className="text-gray-300 font-bold text-3xl">
            0{ i + 1 }
            </div>
            <div className="flex flex-col ml-3">
            <div className="flex items-center">
                <Link href={`/users/${post.writer.username}`} className="rounded-full w-8 h-8 border border-gray-600 overflow-hidden">
                <Image loader={() => imageLoader(post.writer.image)} src={`${API}${post.writer.image}`} alt={post.writer.username} width={72} height={72}/>
                </Link>
                <Link href={`/users/${post.writer.username}`} className="text-xs text-gray-900 font-semibold ml-2">
                { post.writer.username }
                </Link>
            </div>
            <Link href={`/posts/${post.id}/${post.slug}/`} className="font-bold text-sm mt-2 leading-tight">
                { post.title }
            </Link>
            <div className='mt-2 flex items-center text-gray-500 text-xs'>
                <div>
                { normalizeDate(post.created_at) }
                </div>
                <div className="mx-1">&#x2022;</div>
                <div>
                { post.read_time } min read
                </div>
            </div>
            </div>
        </div>
    );
}

export default TrendingPost;