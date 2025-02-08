import toast from 'react-hot-toast';
import useGlobalStorage from '../store';
import { toastStyles } from '../config';

const Launcher = () => {
    const { userInfo, setUserInfo } = useGlobalStorage();
    const handleDeployAgent = async () => {
        try {
            const response = await fetch(
                'https://7011-2405-201-4024-580a-c16c-b6b1-e4e9-136d.ngrok-free.app/create-character',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userInfo),
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (err) {
            toast.error('Failed to deploy agent', toastStyles);
        }
    };
    const handleCreateWallet = async () => {
        if (localStorage.getItem('address')) {
            return;
        }
        const res = await fetch(
            'https://54d3-49-36-139-19.ngrok-free.app/api/create-wallet',
            { method: 'POST', body: JSON.stringify({}) }
        );
        const data = await res.json();
        setUserInfo({ uid: data.wallet_id });
        localStorage.setItem('address', data.address);
    };
    const handleOnboarding = async () => {
        await handleDeployAgent();
        await handleCreateWallet();
    };
    return (
        <div onClick={handleOnboarding} className="border p-2 cursor-pointer">
            Ready to roll your customized agent
        </div>
    );
};

export default Launcher;
