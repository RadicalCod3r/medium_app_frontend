import { useSelector } from 'react-redux';

const TestPage = () => {
    const userSginIn = useSelector(state => state.signIn);
    const { user } = userSginIn;

    console.log(user);

    return (
        <div>
            Test Page
        </div>
    );
}

export default TestPage;