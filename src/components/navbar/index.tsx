import OrionImage from '../../assets/orion-logo.png';

export default function Navbar() {
    return (
        <nav className="z-10 relative container mx-auto w-full">
            <div className="w-full rounded-lg border border-[#79DFED] my-8 bg-[#1B1E29] backdrop-blur-xl">
                <div className="flex h-16 items-center justify-between px-4">
                    <div className="flex items-center space-x-2">
                        <div className="size-10">
                            <img src={OrionImage} alt="orion-logo" />
                        </div>
                        <span className="text-xl font-bold tracking-wider text-white">
                            Orion
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="text-sm font-medium text-white transition-colors">
                            Home
                        </div>
                        <div className="text-sm font-medium text-white transition-colors ">
                            Features
                        </div>
                        <div className="text-sm font-medium text-white transition-colors">
                            Contact us
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="border border-[#FF5800] text-sm font-medium text-white rounded-lg py-2 px-4">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
