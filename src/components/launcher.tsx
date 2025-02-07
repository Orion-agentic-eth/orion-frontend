import toast from 'react-hot-toast';
import useGlobalStorage from '../store';
import { toastStyles } from '../config';

const Launcher = () => {
    const { userInfo } = useGlobalStorage();
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
    return (
        <div onClick={handleDeployAgent} className="border p-2 cursor-pointer">
            Ready to roll your customized agent
        </div>
    );
};

export default Launcher;
