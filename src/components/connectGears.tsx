import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Vr from '../assets/vr.png';
import Watch from '../assets/watch.png';
import { fetchUserData, useFitbitAuth } from '../hooks/useFitbitAuth';
import { generateCodeChallenge, generateCodeVerifier } from '../lib/helper';
import useGlobalStorage from '../store';
import toast from 'react-hot-toast';
import { toastStyles } from '../config';

const ConnectGears = () => {
    useFitbitAuth();
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const [bluetoothPaired, setBluetoothPaired] = useState(false);
    const { userInfo, setUserInfo, setActiveStep } = useGlobalStorage();
    const { data } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => fetchUserData(sessionCode!),
        enabled: !!sessionCode,
    });
    useEffect(() => {
        if (data) {
            setUserInfo({
                ...userInfo,
                twitterUsername: localStorage.getItem('twitter_username'),
                name: data.fullName,
                age: data.age,
                weight: data.weight,
                height: data.height,
                gender: data.gender,
            });
            setActiveStep(2);
        }
    }, [data]);
    const handleGetFitRedirection = async () => {
        const verifier = generateCodeVerifier();
        const challenge = await generateCodeChallenge(verifier);
        sessionStorage.setItem('code_verifier', verifier);
        window.location.href = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23Q6F6&scope=activity+cardio_fitness+electrocardiogram+heartrate+irregular_rhythm_notifications+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=${challenge}&code_challenge_method=S256`;
    };
    const requestBluetoothPermission = async () => {
        try {
            const device = await (navigator as any).bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ['battery_service'],
            });

            toast.success(`Connected to: ${device.name}`, toastStyles);
            setBluetoothPaired(true);
        } catch (error) {
            setBluetoothPaired(false);
            toast.error('Bluetooth connection failed:', toastStyles);
        }
    };

    return (
        <>
            <div className="border border-[#79DFED] p-6 rounded-xl h-full w-full md:size-[400px] mx-4 md:ml-20 text-center md:text-left">
                <div className="bg-[radial-gradient(circle,_#FFFFFF_0%,_#FF5800_100%)] bg-clip-text text-transparent uppercase text-lg md:text-xl">
                    ar gear
                </div>
                <p className="text-sm py-3 md:py-5">
                    Immerse yourself in AI-powered virtual experiences and
                    productivity tools.
                </p>
                <button
                    disabled={bluetoothPaired}
                    className="border border-[#FF5800] p-2 rounded-lg w-full md:w-auto"
                    onClick={requestBluetoothPermission}
                >
                    {bluetoothPaired ? 'Connected' : 'Connect Now'}
                </button>
                <img
                    src={Vr}
                    alt="VR Gear"
                    height={150}
                    width={150}
                    className="mx-auto mt-10 md:mt-16"
                />
            </div>
            {/* Smartwatch */}
            <div className="border border-[#79DFED] p-6 rounded-xl h-full w-full md:size-[400px] mx-4 text-center md:text-left">
                <div className="bg-[radial-gradient(circle,_#FFFFFF_0%,_#FF5800_100%)] bg-clip-text text-transparent uppercase text-lg md:text-xl">
                    smartwatch
                </div>
                <p className="text-sm py-3 md:py-5">
                    Track your fitness, heart rate, and activity in real-time.
                </p>
                <button
                    className="border border-[#FF5800] p-2 rounded-lg w-full md:w-auto cursor-pointer"
                    onClick={handleGetFitRedirection}
                >
                    Connect Now
                </button>
                <img
                    src={Watch}
                    alt="Smartwatch"
                    height={150}
                    width={150}
                    className="mx-auto mt-10 md:mt-16"
                />
            </div>
        </>
    );
};

export default ConnectGears;
