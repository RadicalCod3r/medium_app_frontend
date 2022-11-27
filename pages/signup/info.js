import CustomSubmit from '../../components/custom-submit';
import Navbar from '../../components/navbar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PasswordInput from '../../components/password-input';
import checkPassword from '../../utilities/check-password';
import { signUpStart } from '../../redux/actions/userActions';
import { useRouter } from 'next/router';

const SignUpInfoPage = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState(null);
    const [confirmPassError, setConfirmPassError] = useState(null);

    const phoneValidation = useSelector(state => state.phoneValidation);
    let { data:validatedPhone, error:errorPhone, success:successPhone } = phoneValidation;

    const userSignUp = useSelector(state => state.signUp);
    const { user, error:errorSignUp } = userSignUp;

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (!name) {
            setNameError('Enter your name!');
        }

        if (!email) {
            setEmailError('Enter your email!');
        }

        if (!pass || !checkPassword(pass)) {
            setPassError('Password should have more than 5 characters.');
        } 

        if (!confirmPass || confirmPass !== pass) {
            setConfirmPassError('Confirm password doesnt match with the password.');
        }

        if (phoneNumber && name && email && pass && confirmPass && checkPassword(pass) && pass === confirmPass) {
            dispatch(signUpStart(phoneNumber, name, email, pass));
        }
    }

    useEffect(() => {
        const validatedPhoneFromStorage = localStorage.getItem('validatedPhone') ? JSON.parse(localStorage.getItem('validatedPhone')) : null;
        
        if ((!validatedPhone || validatedPhone === null) && validatedPhoneFromStorage && validatedPhoneFromStorage !== null) {
            validatedPhone = validatedPhoneFromStorage;
        }

        const { phone } = validatedPhone;
        setPhoneNumber(phone);

        if (user && user !== null) {
            router.push('/profile/');
        }
    }, [validatedPhone, user,]);

    return (
        <>
            <Navbar home secondary  />
            <div className="bg-white flex mt-8 items-center justify-center" style={{ height: '100vh' }}>
                <div className="flex flex-col text-center w-100 sm:w-1/2 lg:w-1/3 xl:1/4 px-5 sm:p-0">
                    <div className="text-3xl font-semibold">
                        Your Info
                    </div>
                    <div className="my-8 text-sm text-gray-900">Enter your name and choose a password for your account.</div>
                    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-full">
                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-3 mb-3">Your name</div>
                            <input type="text" onChange={(e) => setName(e.target.value)} className="outline-none border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 text-center w-full" />
                            <div className={`text-xs text-red-500 ${nameError !== null ? 'block' : 'hidden'}`}>
                                { nameError }
                            </div>
                        </div>

                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-3 mb-3">Your Email</div>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="outline-none border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 text-center w-full" />
                            <div className={`text-xs text-red-500 ${emailError !== null ? 'block' : 'hidden'}`}>
                                { emailError }
                            </div>
                        </div>

                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-7 mb-3">Your password</div>
                            <PasswordInput onChange={(e) => setPass(e.target.value)} />
                            <div className={`text-xs text-red-500 ${passError !== null ? 'block' : 'hidden'}`}>
                                { passError }
                            </div>
                        </div>

                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-7 mb-3">Confirm password</div>
                            <PasswordInput onChange={(e) => setConfirmPass(e.target.value)} />
                            <div className={`text-xs text-red-500 ${confirmPassError !== null ? 'block' : 'hidden'}`}>
                                { confirmPassError }
                            </div>
                        </div>

                        <div className="mt-8">
                            <CustomSubmit hoverable>Sign in</CustomSubmit>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUpInfoPage;