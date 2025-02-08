import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '../assets/google.png';
import Xicon from '../assets/x.png';
import useGlobalStorage from '../store';
import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import toast from 'react-hot-toast';
import { toastStyles } from '../config';
const ConnectSocials = () => {
    const { setActiveStep, userInfo, setUserInfo } = useGlobalStorage();
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const login = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/calendar.events',
        onSuccess: async (tokenResponse) => {
            const url =
                'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            });
            const data = await res.json();

            if (data) {
                localStorage.setItem('googleAuth', tokenResponse.access_token);
                setUserInfo({
                    ...userInfo,
                    picture: data.picture,
                });
                toast.dismiss();
                toast.success('Google connected successfully', toastStyles);
            }
        },
    });
    React.useEffect(() => {
        const queryCode = searchParams.get('twitter_username');
        const code = searchParams.get('code');
        if (queryCode) {
            localStorage.setItem('twitter_username', queryCode);
            toast.dismiss();
            toast.success('Twitter connected successfully', toastStyles);
            setActiveStep(1);
        }
        if (code) {
            setActiveStep(1);
        }
        navigate(window.location.pathname, { replace: true });
    }, [searchParams]);
    return (
        <>
            <div className="border border-[#79DFED] rounded-xl h-full w-full md:size-[400px] mx-4 md:ml-20 text-center md:text-left">
                <img
                    src={GoogleIcon}
                    alt="google"
                    height={156}
                    width={156}
                    className="mx-auto py-5"
                />
                <div className="bg-[#1A1D25]  p-6 rounded-b-xl">
                    <div className="bg-[radial-gradient(circle,_#FFFFFF_0%,_#FF5800_100%)] bg-clip-text text-transparent uppercase text-lg md:text-xl">
                        google
                    </div>
                    <p className="text-sm py-3 md:py-5">
                        Sync your calendar and preferences for effortless
                        scheduling.
                    </p>
                    <button
                        className="border border-[#FF5800] p-2 rounded-lg w-full md:w-auto cursor-pointer"
                        onClick={() => login()}
                    >
                        Connect Now
                    </button>
                </div>
            </div>
            <div className="border border-[#79DFED] rounded-xl h-full w-full md:size-[400px] mx-4 text-center md:text-left">
                <img
                    src={Xicon}
                    alt="twitter"
                    height={190}
                    width={190}
                    className="mx-auto py-5"
                />
                <div className="bg-[#1A1D25]  p-6 rounded-b-xl">
                    <div className="bg-[radial-gradient(circle,_#FFFFFF_0%,_#FF5800_100%)] bg-clip-text text-transparent uppercase text-lg md:text-xl">
                        X (Twitter)
                    </div>
                    <p className="text-sm py-3 md:py-5">
                        Get AI-curated insights and stay updated with trending
                        topics.
                    </p>
                    <a
                        href={
                            'https://x-auth-production.up.railway.app/auth/twitter'
                        }
                        className="border border-[#FF5800] p-2 rounded-lg w-full md:w-auto cursor-pointer"
                    >
                        Connect Now
                    </a>
                </div>
            </div>
            <Link to={'/your-agent'}>asdf</Link>
        </>
    );
};

export default ConnectSocials;
