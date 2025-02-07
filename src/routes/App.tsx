import AgentInfo from '../assets/agent-info.webp';

import { Link } from 'react-router';
import Navbar from '../components/navbar';
function App() {
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
                <Link
                    to={'/launch-your-agent'}
                    className="bg-gradient-to-r from-orange-600/90 to-orange-700 text-sm font-medium text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700"
                >
                    Launch your agent
                </Link>
            </div>
            <div className="relative w-full flex flex-col items-center mt-5 md:mt-8">
                <img
                    src={AgentInfo}
                    alt="agent-info"
                    className="w-full  md:-mt-[250px]"
                />
            </div>
        </div>
    );
}

export default App;
