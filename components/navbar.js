import Link from 'next/link';
import Button from './button';

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 border-b border-gray-900 bg-yellow-500">
            <nav className="p-4 flex justify-between items-center mx-auto container">
                <Link href="#" className='flex items-center'>
                    <i className="fa-brands fa-medium fa-2x"></i>
                    <span className="font-bold text-2xl mx-1">Medium</span>
                </Link>
                <div>
                    <Link href="#" className="mr-4 text-sm text-gray-900 hidden md:inline-block">Our story</Link>
                    <Link href="#" className="mr-4 text-sm text-gray-900 hidden md:inline-block">Membership</Link>
                    <Link href="#" className="mr-4 text-sm text-gray-900 hidden md:inline-block">Write</Link>
                    <Link href="#" className="mr-4 text-sm text-gray-900 hidden sm:inline-block">Sign In</Link>
                    <Button href='#' sm>Get started</Button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;