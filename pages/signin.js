import Link from 'next/link';
import CustomSubmit from '../components/custom-submit';
// import Navbar from '../components/navbar';
import PasswordInput from '../components/password-input';
import { signInStart } from '../redux/actions/userActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import checkPhone from '../utilities/check-phone';
import checkPassword from '../utilities/check-password';


const Navbar = dynamic(() => import('../components/navbar'), { ssr: false });

const SignInPage = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const userSignIn = useSelector(state => state.signIn);
    const { user, error:signInError } = userSignIn;

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [phoneError, setPhoneError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (phone !== '' && phone !== null && password !== '' && password !== null && checkPhone(phone) && checkPassword(password)) {
           dispatch(signInStart(phone, password));
        }

        if (!checkPhone(phone)) {
            setPhoneError('Enter a correct persian phone number!');
        }

        if (!checkPassword(password)) {
            setPasswordError('Password should be between 7 to 16 characters.');
        }
    }

    useEffect(() => {
        if (user && user !== null) {
            console.log(user);
            router.push('/profile');
        } else {
            console.log(signInError);
        }
    }, [user,]);

    return (
        <>
            <Navbar home secondary user={user}  />
            <div className="bg-white flex items-center justify-center" style={{ height: '100vh' }}>
                <div className="flex flex-col text-center w-100 sm:w-1/2 lg:w-1/3 xl:1/4 px-5 sm:p-0">
                    <div className="text-3xl font-semibold">Sign in</div>
                    <div className="my-8 text-sm text-gray-900">Enter the phone number and password associated with your account.</div>
                    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-full">
                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-3 mb-3">Your phone number</div>
                            <input type="number" className="outline-none border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 text-center w-full" onChange={(e) => setPhone(e.target.value)} />
                            <div className={`text-xs text-red-500 ${phoneError !== null ? 'block' : 'hidden'}`}>
                                { phoneError }
                            </div>
                        </div>

                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-7 mb-3">Your password</div>
                            <PasswordInput onChange={(e) => setPassword(e.target.value)} />
                            <div className={`text-xs text-red-500 ${passwordError !== null ? 'block' : 'hidden'}`}>
                                { passwordError }
                            </div>                            
                        </div>

                        <div className={`${signInError ? 'block' : 'hidden'} mt-8 w-2/3 bg-red-200 text-red-700 text-sm border border-red-500 rounded-lg flex items-center justify-center p-3`}>
                            { signInError }
                        </div>

                        <div className="mt-8">
                            <CustomSubmit hoverable>Sign in</CustomSubmit>
                        </div>
                    </form>
                    <div className="mt-8 text-gray-900 text-sm">
                        Not signed up yet? <Link href="/signup" className="text-indigo-500 border-b border-indigo-500">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInPage;