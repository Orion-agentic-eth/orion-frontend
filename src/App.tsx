import { useQuery } from '@tanstack/react-query';
import AgentInfo from './assets/agent-info.webp';

import ConnectGears from './components/connectGears';
import ConnectSocials from './components/connectSocials';
import Navbar from './components/navbar';
import VerticalLinearStepper from './components/ui/stepper';
import { fetchUserData, useFitbitAuth } from './hooks/useFitbitAuth';
import useGlobalStorage from './store';
function App() {
    useFitbitAuth();
    const sessionCode = sessionStorage.getItem('fitbit_token');
    const { data } = useQuery({
        queryKey: ['user-data'],
        queryFn: () => fetchUserData(sessionCode!),
        enabled: !!sessionCode,
    });
    const { activeStep } = useGlobalStorage();
    console.log(data);

    return (
        <div className="relative font-orbitron min-h-screen flex flex-col items-center px-4 md:px-8">
            <Navbar />
            <div className="relative z-10 pt-12 text-center max-w-2xl w-full">
                <div className="text-2xl md:text-3xl font-semibold leading-snug">
                    Your Personal AI Agent for Fitness, Scheduling & Investing
                </div>
                <p className="py-5 md:py-10 text-sm md:text-base">
                    Orion simplifies your life with AI-driven solutions,
                    optimizing your health, time, and finances effortlessly.
                </p>
                <button className="bg-gradient-to-r from-orange-600/90 to-orange-700 text-sm font-medium text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700">
                    Launch your agent
                </button>
            </div>
            <div className="relative w-full flex flex-col items-center mt-5 md:mt-8">
                <img
                    src={AgentInfo}
                    alt="agent-info"
                    className="w-full  md:-mt-[250px]"
                />
                <div className="md:-mt-[100px]">
                    <div className="text-xl md:text-3xl font-bold text-center">
                        Launch your Agent
                    </div>

                    <div className="text-center text-sm md:text-xl pt-5 md:pt-20 text-white">
                        Connect Your Socials – Stay Synced with Orion
                    </div>
                    <p className="text-[11px] md:text-sm max-w-3xl leading-loose py-5 text-center">
                        Enhance Orion’s AI capabilities by linking your favorite
                        platforms for smarter recommendations, seamless
                        scheduling, and a truly personalized experience.
                    </p>
                </div>{' '}
                <div className="flex flex-col md:flex-row items-center py-10 md:py-20 mx-auto container gap-6 md:gap-x-6">
                    <VerticalLinearStepper />
                    {activeStep === 0 ? <ConnectSocials /> : <ConnectGears />}
                </div>
            </div>
        </div>
    );
}

export default App;
