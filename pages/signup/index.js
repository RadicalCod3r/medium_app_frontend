import CustomSubmit from '../../components/custom-submit';
import Navbar from '../../components/navbar';

const SignUpPage = () => {
    const formSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar home secondary  />
            <div className="bg-white flex items-center justify-center" style={{ height: '100vh' }}>
                <div className="flex flex-col text-center w-100 sm:w-1/2 lg:w-1/3 xl:1/4 px-5 sm:p-0">
                    <div className="text-3xl font-semibold">Sign up</div>
                    <div className="my-8 text-sm text-gray-900">Enter your phone number. we will send you an otp code to confirm.</div>
                    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-full">
                        <div className="text-xs text-gray-800 text-center mt-3 mb-3">Your phone number</div>
                        <input type="number" className="outline-none border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 text-center w-2/3" />
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