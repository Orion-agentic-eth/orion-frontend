import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '../assets/google.png';
import useGlobalStorage from '../store';
const ConnectSocials = () => {
    const { setActiveStep } = useGlobalStorage();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const url =
                'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            });
            if (res) {
                console.log(res);
                setActiveStep(1);
            }
        },
    });
    return (
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
                </div>{' '}
                <p className="text-sm py-3 md:py-5">
                    Sync your calendar and preferences for effortless
                    scheduling.
                </p>{' '}
                <button
                    className="border border-[#FF5800] p-2 rounded-lg w-full md:w-auto cursor-pointer"
                    onClick={() => login()}
                >
                    Connect Now
                </button>
            </div>
        </div>
    );
};

export default ConnectSocials;
