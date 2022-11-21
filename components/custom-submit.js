const CustomSubmit = ({ children, hoverable, sm, xs, secondary }) => {
    return (
        <input type='submit' value={children} className={`rounded-full cursor-pointer ${secondary ? (hoverable ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600') : (hoverable ? 'bg-gray-900 hover:bg-black' : 'bg-black')} ${(sm || xs) && 'text-xs'} text-white font-semibold ${xs ? 'px-2 py-1' : sm ? 'px-3 py-2' : 'px-10 py-2'}`} />
    );
}

export default CustomSubmit;