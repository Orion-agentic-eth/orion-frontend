import toast from 'react-hot-toast';
import useGlobalStorage from '../store';
import { toastStyles } from '../config';
import { Confetti, ConfettiRef } from './ui/confeti';
import { useRef } from 'react';
import { useNavigate } from 'react-router';

const Launcher = () => {
    const { userInfo, setUserInfo } = useGlobalStorage();
    const navigate = useNavigate();
    const confettiRef = useRef<ConfettiRef>(null);
    const handleDeployAgent = async () => {
        try {
            const response = await fetch(
                'https://0598-2405-201-4024-580a-531-12cf-5bcf-e757.ngrok-free.app/create-character',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userInfo),
                }
            );
            const data = await response.json();
            if (data) {
                const res = await fetch(
                    'https://orion-eliza-production.up.railway.app/api/knowledge-base/add',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data.character),
                    }
                );
                const resp = await res.json();
                setUserInfo({ dynamicId: resp.name });
            }
        } catch (err) {
            toast.error('Failed to deploy agent', toastStyles);
        }
    };
    const handleCreateWallet = async () => {
        if (localStorage.getItem('address')) {
            return;
        }
        const res = await fetch(
            'https://orion-server-wallet-production.up.railway.app/api/create-wallet',
            { method: 'POST', body: JSON.stringify({}) }
        );
        const data = await res.json();
        setUserInfo({ uid: data.wallet_id });
        localStorage.setItem('address', data.address);
    };
    const handleOnboarding = async () => {
        await handleDeployAgent();
        await handleCreateWallet();
        navigate('/your-agent');
    };
    return (
        <div
            onClick={handleOnboarding}
            className="relative px-20 flex h-[150px] ml-44 flex-col items-center justify-center overflow-hidden rounded-lg border "
        >
            <span className="underline cursor-pointer text-center font-semibold leading-none">
                Ready to roll your customized agent
            </span>

            <Confetti
                ref={confettiRef}
                className="absolute left-0 top-0 z-0 size-full"
                onMouseEnter={() => {
                    confettiRef.current?.fire({});
                }}
            />
        </div>
    );
};

export default Launcher;
