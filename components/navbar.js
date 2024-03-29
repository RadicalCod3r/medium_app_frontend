import Link from 'next/link';
import CustomLink from './custom-link';
import classes from './navbar.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const API = 'http://localhost:8000';

const Navbar = ({ home, secondary, user }) => {
    console.log(user);

    const [clientUser, setClientUser] = useState(user);
    
    useEffect(() => {
        if (!user || user !== null) {
            if (typeof window !== 'undefined') {
                console.log('window defined');
                setClientUser(JSON.parse(localStorage.getItem('user')));
            }
        }
    }, [user,]);


    return (
        <>
            <header className={`fixed ${home ? `top-0 left-0 right-0 border-b border-gray-900 ${secondary ? 'bg-white' : 'bg-yellow-500'}` : `${classes.sideNav} bg-white flex items-center justify-center`}`}>
                { home ? (
                    <nav className="p-4 flex justify-between items-center mx-auto container">
                        <Link href="/" className='flex items-center'>
                            <i className="fa-brands fa-medium fa-2x"></i>
                            <span className="font-bold text-2xl mx-1">Medium</span>
                        </Link>
                        <div className="flex flex-row items-center">
                            <Link href="/" className="mr-4 text-sm text-gray-900 hidden md:inline-block">Our story</Link>
                            <Link href="/" className="mr-4 text-sm text-gray-900 hidden md:inline-block">Membership</Link>
                            <Link href="/" className="mr-4 text-sm text-gray-900 hidden md:inline-block">Write</Link>
                            {/* <div> */}
                            { clientUser && clientUser !== null && clientUser.image && clientUser.name ? (
                                <Link href="/profile" className="rounded-full border border-gray-600 overflow-hidden mr-4 flex items-center justify-center" style={{ width: '30px', height: '30px' }}>
                                    <Image className="object-center object-cover" src={`${API}${clientUser.image}`} alt={clientUser.name} width={48} height={48} />
                                </Link>
                            ) : ( 
                                <Link href="/signin/" className="mr-4 text-sm text-gray-900 hidden sm:inline-block">Sign In</Link>
                            ) }
                            {/* </div> */}
                            <CustomLink href='/signin/' sm>Get started</CustomLink>
                        </div>
                    </nav>
                ) : (
                    <nav className={`p-4 flex lg:flex-col items-center justify-between w-full h-14 lg:h-5/6 lg:w-20`}>
                        <Link href="/" className="hidden lg:flex lg:items-center lg:justify-center">
                            <i className="fa-brands fa-medium fa-2x"></i>
                        </Link>
                        <div className='flex justify-between items-center lg:flex-col h-1/2 w-full px-3 sm:max-w-lg md:max-w-xl sm:mx-auto lg:mx-0 lg:px-0'>
                            <Link href="/">
                                <i class="fa-solid fa-house fa-lg text-gray-600"></i>
                            </Link>
                            <Link href="/">
                                <i class="fa-solid fa-bell fa-lg text-gray-600"></i>                       
                            </Link>
                            <Link href="/">
                                <i class="fa-solid fa-bookmark fa-lg text-gray-600"></i>                        
                            </Link>
                            <Link href="/" className="hidden lg:block border-b border-gray-300 pb-6">
                                <i class="fa-solid fa-book fa-lg text-gray-600"></i>                        
                            </Link>
                            <Link href="/" className="hidden lg:block">
                                <i class="fa-solid fa-pen-to-square fa-lg text-gray-600"></i>
                            </Link>
                            <Link href="/users/" className="lg:hidden w-6 h-6 rounded-full bg-gray-300 border border-gray-500">
                            </Link>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-center">
                            <Link href="/users/" className="w-6 h-6 rounded-full bg-gray-300 border border-gray-500"></Link>
                        </div>
                    </nav>
                ) }
            </header>
            { !home && (
                <header className="block fixed top-0 left-0 right-0 bg-white h-12 border-b-2 border-gray-300 lg:hidden px-5">
                    <nav className="flex items-center justify-between h-full">
                        <Link href="/" className="flex items-center justify-center">
                            <i className="fa-brands fa-medium fa-2x"></i>
                        </Link>
                        <CustomLink href="/" sm>Upgrade</CustomLink>
                    </nav>
                </header>   
            ) }
        </>
    );
}

export default Navbar;