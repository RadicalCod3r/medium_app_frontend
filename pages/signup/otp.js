import CustomSubmit from '../../components/custom-submit';
import Navbar from '../../components/navbar';
import OtpInput from 'react-otp-input';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/custom-button';
import { useSelector } from 'react-redux';
import { validateOTPStart, validatePhoneStart } from '../../redux/actions/userActions';
import checkPhone from '../../utilities/check-phone';
import Router, { useRouter } from 'next/router';

const OtpPage = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const [OTP, setOTP] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [resendTime, setResendTime] = useState('0:00');
    const [showTimer, setShowTimer] = useState(true);
    const [fieldError, setFieldError] = useState(null);

    const phoneValidation = useSelector(state => state.phoneValidation);
    let { data:validatedPhone, error:errorPhone, success:successPhone } = phoneValidation;

    const otpValidation = useSelector(state => state.otpValidation);
    const { message, error:errorOTP, success:successOTP } = otpValidation;

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (phoneNumber && OTP && checkPhone(phoneNumber) && OTP.length === 6) {
            dispatch(validateOTPStart(phoneNumber, OTP));
        } else {
            setFieldError('OTP code should be 6 digits');
        }
    }

    const resendOTP = () => {
        if (phoneNumber && checkPhone(phoneNumber)) {
            dispatch(validatePhoneStart(phoneNumber));
        }
    }

    useEffect(() => {
        const validatedPhoneFromStorage = localStorage.getItem('validatedPhone') ? JSON.parse(localStorage.getItem('validatedPhone')) : null;
        
        if ((!validatedPhone || validatedPhone === null) && validatedPhoneFromStorage && validatedPhoneFromStorage !== null) {
            validatedPhone = validatedPhoneFromStorage;
        }

        let { phone, resend_at } = validatedPhone;
        setPhoneNumber(phone);

        let countDownDate;

        if (resend_at) {
            resend_at = resend_at.substring(0, 19);
            countDownDate = new Date(resend_at).getTime();           
            console.log(countDownDate);
        } else {
            const minutesLater = 2;
            const currentDate = new Date();
            countDownDate = new Date(currentDate.getTime() + minutesLater*60000).getTime();
        }

        
        let x = setInterval(() => {
            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            setResendTime(minutes + ":" + seconds);

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                setShowTimer(false);
            } else {
                setShowTimer(true);    
            }
        }, 1000);

        if (message && message !== null && successOTP) {
            router.push('/signup/info/');
        }

        if (validatedPhone && successPhone) {
            Router.reload();
        }
    }, [validatedPhone, successPhone, message, successOTP,]);

    return (
        <>
            <Navbar home secondary   />
            <div className="bg-white flex items-center justify-center" style={{ height: '100vh' }}>
                <div className="flex flex-col text-center w-100 sm:w-1/2 lg:w-1/3 xl:1/4 px-5 sm:p-0">
                    <div className="text-3xl font-semibold">Check your phone!</div>
                    <div className="my-8 text-sm text-gray-900">We sent you an otp code. Enter the code in the field bellow.</div>
                    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-full">
                        <div className="text-xs text-gray-800 text-center mt-3 mb-3">Enter otp code</div>
                        <OtpInput
                            value={OTP}
                            onChange={setOTP}
                            numInputs={6}
                            isInputNum
                            separator={<span>-</span>}
                        />
                        <div className={`text-xs text-red-500 ${fieldError !== null ? 'block' : 'hidden'}`}>
                            { fieldError }
                        </div>
                        <div className={`mt-8 flex items-center text-sm ${showTimer ? 'block' : 'hidden'}`}>
                            <div id='timer-text' className='text-gray-600'>
                                Resend at: 
                            </div>
                            <div id='timer' className='ml-2'>{ resendTime }</div>
                        </div>

                        <div className={`${errorOTP ? 'block' : 'hidden'} mt-8 w-2/3 bg-red-200 text-red-700 text-sm border border-red-500 rounded-lg flex items-center justify-center p-3`}>
                            { errorOTP }
                        </div>

                        <div className="mt-4 flex justify-center items-center">
                            <div className={`mr-3 ${showTimer ? 'hidden' : 'block'}`}>
                                <CustomButton hoverable secondary onClick={resendOTP}>Resend OTP</CustomButton>
                            </div>
                            <CustomSubmit hoverable>Continue</CustomSubmit>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default OtpPage;