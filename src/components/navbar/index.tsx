import toast from 'react-hot-toast';
import OrionImage from '../../assets/orion-logo.png';
import { toastStyles } from '../../config';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/modal';
import { useState } from 'react';

export default function Navbar() {
    const address = localStorage.getItem('address');
    const [name, setName] = useState('');
    const [policyId, setPolicyId] = useState('');

    const handleCreatePolicy = async () => {
        try {
            const res = await fetch(
                'https://orion-server-wallet-production.up.railway.app/api/create-policy-limit-2',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, maxAmount: (1e8).toString() }),
                }
            );
            const data = await res.json();
            setPolicyId(data.id);
            toast.success('Policy created successfully', toastStyles);
        } catch (err) {
            toast.error('Failed to create policy', toastStyles);
        }
    };
    return (
        <nav className="font-orbitron z-10 relative container mx-auto">
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
                    <div className="flex items-center gap-x-4">
                        <button
                            className="cursor-pointer border border-[#FF5800] text-sm font-medium text-white rounded-lg py-2 px-4"
                            onClick={() => {
                                if (address) {
                                    navigator.clipboard.writeText(address);
                                    toast.success(
                                        'Address copied',
                                        toastStyles
                                    );
                                }
                            }}
                        >
                            {address
                                ? address.slice(0, 12) +
                                  '...' +
                                  address.slice(-12)
                                : 'Get Started'}
                        </button>

                        {address && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="bg-[#FF5800] rounded-md p-2 text-sm cursor-pointer">
                                        Policies
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Create policies
                                        </DialogTitle>
                                        <DialogDescription>
                                            Create policies to manage your
                                            transactions
                                        </DialogDescription>
                                    </DialogHeader>
                                    <input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="border border-[#79DFED] rounded-md px-3 py-2 focus:outline-none"
                                    />
                                    <DialogFooter>
                                        <button
                                            disabled={policyId ? true : false}
                                            onClick={handleCreatePolicy}
                                            className="border border-[#79DFED] py-1 cursor-pointer px-2 rounded-md mt-5"
                                        >
                                            {policyId
                                                ? `Policy id -> ${policyId}`
                                                : 'Create now'}
                                        </button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
