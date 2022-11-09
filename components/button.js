import Link from 'next/link';

const Button = ({ href, children, hoverable, sm }) => {
    return (
        <Link href={href} className={`rounded-full ${hoverable === true ? 'bg-gray-900 hover:bg-black' : 'bg-black'} ${sm && 'text-xs'} text-white font-semibold py-2 ${sm === true ? 'px-3' : 'px-10'}`}>
            { children }
        </Link>
    );
}

export default Button;