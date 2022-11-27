import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileStart, logoutStart } from '../redux/actions/userActions';
import CustomButton from '../components/custom-button';

const ProfilePage = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const userProfile = useSelector(state => state.userProfile);
    const { profile, error: errorProfile } = userProfile;

    const userSignIn = useSelector(state => state.signIn);
    let { user, error: errorSignIn } = userSignIn;

    const userLogout = useSelector(state => state.logout);
    const { message, error: errorLogout, success: successLogout } = userLogout;

    console.log(profile);

    const logoutHandler = () => {
        dispatch(logoutStart());
    }

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; 

        if ((!user || user === null) && userFromStorage && userFromStorage !== null) {
            user = userFromStorage;
        }

        if (!user) {
            router.push('/signin');
        } else {
            if (!profile || profile === null || !profile.name || profile.id !== user.id) {
                dispatch(fetchProfileStart());
            }
        }

        if (successLogout) {
            router.push('/');
        }
    }, [profile, user, successLogout]);

    return (
        <>
            { errorProfile && errorProfile !== null && (
                <div>{ errorProfile }</div>
            ) }
            { profile && profile !== null && (
                <div>
                    <div>
                        { profile.name }
                    </div>
                    <CustomButton sm hoverable onClick={logoutHandler}>Logout</CustomButton>
                </div>
            ) }
        </>
    );
}

export default ProfilePage;