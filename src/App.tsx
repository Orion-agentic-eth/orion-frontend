import Navbar from './components/navbar';
import AgentInfo from './assets/agent-info.webp';
import { generateCodeChallenge, generateCodeVerifier } from './lib/helper';
import { useQuery } from '@tanstack/react-query';
import { fetchUserData, useFitbitAuth } from './hooks/useFitbitAuth';
function App() {
    useFitbitAuth();
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const { data } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => fetchUserData(sessionCode!),
        enabled: !!sessionCode,
    });
    const handleGetFitRedirection = async () => {
        const verifier = generateCodeVerifier();
        const challenge = await generateCodeChallenge(verifier);
        sessionStorage.setItem('code_verifier', verifier);
        window.location.href = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23Q6F6&scope=activity+cardio_fitness+electrocardiogram+heartrate+irregular_rhythm_notifications+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight&code_challenge=${challenge}&code_challenge_method=S256`;
    };
    console.log(data);
    return (
        <div className="relative font-orbitron ">
            <Navbar />

            <div className="relative z-10 pt-12   text-center w-xl mx-auto">
                <div className="text-3xl font-semibold leading-normal">
                    Your Personal AI Agent for Fitness, Scheduling & Investing
                </div>
                <div className="py-7">
                    Orion simplifies your life with AI-driven solutions,
                    optimizing your health, time, and finances effortlessly.
                </div>
                <button className="bg-gradient-to-r from-orange-600/90 to-orange-700 text-sm font-medium text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700">
                    Launch your agent
                </button>
            </div>
            <div className="absolute top-0">
                <img src={AgentInfo} alt="agent-info" />
                <div className="text-3xl font-bold pb-10 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-0">
                    Launch your Agent
                </div>
                <div
                    className="py-4 flex items-center justify-center w-full flex-col"
                    onClick={handleGetFitRedirection}
                >
                    <div className="h-fit w-full md:w-fit mx-auto mt-3 cursor-pointer">
                        Connect Gear
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
