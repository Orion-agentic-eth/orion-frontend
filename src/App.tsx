import Navbar from './components/navbar';
import AgentInfo from './assets/agent-info.webp';
function App() {
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
                <div className="text-3xl font-bold pb-20 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-0">
                    Launch your Agent
                </div>
            </div>
        </div>
    );
}

export default App;
