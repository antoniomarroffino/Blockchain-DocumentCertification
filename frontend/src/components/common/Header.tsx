import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetamask } from '../../hook/useMetamask.ts';
import {
    WalletIcon,
    ChevronDownIcon,
    DocumentDuplicateIcon,
    IdentificationIcon,
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export default function Header() {
    const navigate = useNavigate();
    const { network, isConnected, signer, connectWithMetamask } = useMetamask();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const fullAddress = signer?.address || '';

    const handleConnect = async () => {
        try {
            await connectWithMetamask();
            toast.success('Wallet connected!');
        } catch {
            toast.error('Could not connect wallet');
        }
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(fullAddress);
        toast('Address copied', { icon: '📋' });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-base-100 border-b border-base-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <CheckBadgeIcon className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-extrabold tracking-tight">CertifyChain</h1>
            </div>

            <div className="flex items-center" ref={dropdownRef}>
                {isConnected ? (
                    <div className="relative">
                        <button
                            onClick={() => setOpen(o => !o)}
                            className="flex items-center space-x-2 bg-white border border-base-200 px-4 py-2 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
                        >
                            <WalletIcon className="w-6 h-6 text-primary" />
                            <span className="font-medium text-sm truncate max-w-[10rem]">{fullAddress}</span>
                            <ChevronDownIcon className={`w-5 h-5 text-gray-500 transform transition-transform ${open ? 'rotate-180' : ''}`} />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 z-20">
                                <div className="p-4 space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <WalletIcon className="w-10 h-10 text-primary" />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-800 break-all">{fullAddress}</p>
                                            <p className="text-xs text-gray-500 mt-1">Network: {network || '-'}</p>
                                        </div>
                                        <button
                                            onClick={copyAddress}
                                            className="p-1 text-gray-500 hover:text-primary transition cursor-pointer"
                                        >
                                            <DocumentDuplicateIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="border-t border-base-200" />
                                    <button
                                        onClick={() => { navigate('/profile'); setOpen(false); }}
                                        className="w-full flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition cursor-pointer"
                                    >
                                        <IdentificationIcon className="w-5 h-5" />
                                        <span className="text-sm font-medium">View Profile</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={handleConnect}
                        className="flex items-center space-x-2 bg-primary text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl transform active:scale-95 transition"
                    >
                        <WalletIcon className="w-6 h-6" />
                        <span className="font-semibold">Connect Wallet</span>
                    </button>
                )}
            </div>
        </header>
    );
}
