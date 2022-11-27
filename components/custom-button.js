const CustomButton = ({ children, hoverable, sm, xs, secondary, onClick }) => {
    return (
        <button onClick
        ={onClick} className={`rounded-full ${secondary ? (hoverable ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600') : (hoverable ? 'bg-gray-900 hover:bg-black' : 'bg-black')} ${(sm || xs) && 'text-xs'} text-white font-semibold ${xs ? 'px-2 py-1' : sm ? 'px-3 py-2' : 'px-10 py-2'}`}>
            { children }
        </button>
    );
}

export default CustomButton;