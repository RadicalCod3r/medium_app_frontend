import CustomSubmit from '../../components/custom-submit';
import Navbar from '../../components/navbar';
import OtpInput from 'react-otp-input';
import { useState } from 'react';

const OtpPage = () => {
    const [OTP, setOTP] = useState('');

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(OTP);
    }

    return (
        <>
            <Navbar home secondary   />
            <div className="bg-white flex items-center justify-center" style={{ height: '100vh' }}>
                <div className="flex flex-col text-center w-100 sm:w-1/2 lg:w-1/3 xl:1/4 px-5 sm:p-0">
                    <div className="text-3xl font-semibold">Check your phone!</div>
                    <div className="my-8 text-sm text-gray-900">We sent you an otp code. Enter the code in the field bellow.</div>
                    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-full">
                        <div className="text-xs text-gray-800 text-center mt-3 mb-3">Enter otp code</div>
                        {/* <input type="number" maxLength="6" className="outline-none border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 text-center w-2/3" /> */}
                        <OtpInput
                            value={OTP}
                            onChange={setOTP}
                            numInputs={6}
                            separator={<span>-</span>}
                        />
                        <div className="mt-8">
                            <CustomSubmit hoverable>Continue</CustomSubmit>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default OtpPage;