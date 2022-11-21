import { useState } from 'react';

const PasswordInput = () => {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="border-b border-gray-700 hover:border-gray-900 focus:border-gray-900 w-full flex flex-row justify-between">
            <input type={showPass ? 'text' : 'password'} className="outline-none text-center w-full" />
            <div className={`flex items-center justify-center ${showPass ? 'hidden' : 'flex pl-1'}`} onClick={() => setShowPass(!showPass)}>
                <i className='fa-solid fa-eye text-gray-700'></i>
            </div>

            <div className={`flex items-center justify-center ${showPass ? 'flex pl-1' : 'hidden'}`} onClick={() => setShowPass(!showPass)}>
                <i className='fa-solid fa-eye-slash text-gray-700'></i>
            </div>
        </div>
    );
}

export default PasswordInput;