import ConnectGears from '../components/connectGears';
import ConnectSocials from '../components/connectSocials';
import Launcher from '../components/launcher';

import Navbar from '../components/navbar';
import VerticalLinearStepper from '../components/ui/stepper';
import useGlobalStorage from '../store';

const LaunchAgent = () => {
    const { activeStep } = useGlobalStorage();
    return (
        <div className="relative font-orbitron min-h-screen flex flex-col items-center px-4 md:px-8">
            <Navbar />
            <div className="mt-12">
                <div className="text-xl md:text-3xl font-bold text-center">
                    Launch your Agent
                </div>

                <div className="text-center text-sm md:text-xl pt-5 md:pt-20 text-white">
                    Connect Your Socials – Stay Synced with Orion
                </div>
                <p className="text-[11px] md:text-sm max-w-3xl leading-loose py-5 text-center">
                    Enhance Orion’s AI capabilities by linking your favorite
                    platforms for smarter recommendations, seamless scheduling,
                    and a truly personalized experience.
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center py-10  mx-auto container gap-6 md:gap-x-6">
                <VerticalLinearStepper />
                {activeStep === 0 ? (
                    <ConnectSocials />
                ) : activeStep === 1 ? (
                    <ConnectGears />
                ) : (
                    <Launcher />
                )}
            </div>
        </div>
    );
};

export default LaunchAgent;
