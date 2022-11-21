import CustomSubmit from '../../components/custom-submit';
import Navbar from '../../components/navbar';
import { useState } from 'react';
import PasswordInput from '../../components/password-input';

const SinUpInfoPage = () => {
    const [show, setShow] = useState(false);

    const formSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar home secondary  />
            <div className="bg-white flex items-center justify-center" style={{ height: '100vh' }}>
                <div className="flex flex-col text-center w-100 sm:w-1/2 lg:w-1/3 xl:1/4 px-5 sm:p-0">
                    <div className="text-3xl font-semibold">
                        Your Info
                    </div>
                    <div className="my-8 text-sm text-gray-900">Enter your name and choose a password for your account.</div>
                    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-full">
                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-3 mb-3">Your name</div>
                            <input type="text" className="outline-none border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 text-center w-full" />
                        </div>

                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-7 mb-3">Your password</div>
                            <PasswordInput />
                        </div>

                        <div className="w-2/3">
                            <div className="text-xs text-gray-800 text-center mt-7 mb-3">Confirm password</div>
                            <PasswordInput />
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

export default SinUpInfoPage;