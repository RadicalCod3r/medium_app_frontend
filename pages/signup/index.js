import CustomSubmit from '../../components/custom-submit';
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../../components/navbar'), { ssr: false });
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validatePhoneStart } from '../../redux/actions/userActions';
import checkPhone from '../../utilities/check-phone';
import { useRouter } from 'next/router';

const SignUpPage = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(null);
    
    const phoneValidation = useSelector(state => state.phoneValidation);
    const { data, error, success } = phoneValidation;

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (phone && checkPhone(phone)) {
            dispatch(validatePhoneStart(phone));
        } else {
            setPhoneError('Enter a correct persian phone number!');
        }
    }

    useEffect(() => {
        if (data && success) {
            router.push('/signup/otp/');
        }
    }, [data, success]);

    return (
        <>
            <Navbar home secondary  />
            <div className="bg-white flex items-center justify-center" style={{ height: '100vh' }}>
                <div className="flex flex-col text-center w-100 sm:w-1/2 lg:w-1/3 xl:1/4 px-5 sm:p-0">
                    <div className="text-3xl font-semibold">Sign up</div>
                    <div className="my-8 text-sm text-gray-900">Enter your phone number. we will send you an otp code to confirm.</div>
                    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-full">
                        <div className="w-full">
                            <div className="text-xs text-gray-800 text-center mt-3 mb-3">Your phone number</div>
                            <input type="number" className="outline-none border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 text-center w-2/3" onChange={(e) => setPhone(e.target.value)} />
                            <div className={`text-xs text-red-500 ${phoneError !== null ? 'block' : 'hidden'}`}>
                                { phoneError }
                            </div>
                        </div>

                        <div className={`${error ? 'block' : 'hidden'} mt-8 bg-red-200 text-red-700 text-sm border border-red-500 rounded-lg flex items-center justify-center p-3`}>
                            { error }
                        </div>

                        <div className="mt-8">
                            <CustomSubmit hoverable>Continue</CustomSubmit>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;