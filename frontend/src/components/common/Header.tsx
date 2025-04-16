import {useMetamask} from "../../hook/useMetamask.ts";
import {UserCircleIcon, WalletIcon} from "@heroicons/react/24/outline";
import {CheckBadgeIcon} from "@heroicons/react/24/solid";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const {
        network,
        isConnected,
        signer,
        connectWithMetamask
    } = useMetamask();
    const shortAddress = signer?.address
        ? `${signer.address.slice(0, 6)}...${signer.address.slice(-4)}`
        : "";

    return (
        <div className="navbar bg-base-100 border-b border-base-200 px-6">
            <div className="flex-1">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <CheckBadgeIcon className="w-6 h-6 text-primary"/>
                    <span className="hidden sm:inline">CertifyChain</span>
                </h1>
            </div>

            <div className="flex-none gap-4">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost flex items-center gap-2 hover:bg-base-200 transition-all"
                    >
                        {isConnected ? (
                            <>
                                <div className="avatar placeholder">
                                    <UserCircleIcon className="w-8 h-8"/>
                                </div>
                                <div className="hidden md:flex flex-col items-start">
                                    <span className="text-sm font-medium">{shortAddress}</span>
                                    <span className="text-xs text-success flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    Connected
                  </span>
                                </div>
                            </>
                        ) : (
                            <button
                                onClick={connectWithMetamask}
                                className="btn btn-primary gap-2"
                            >
                                <WalletIcon className="w-5 h-5"/>
                                Connect Wallet
                            </button>
                        )}
                    </label>

                    <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64"
                    >
                        {isConnected ? (
                            <>
                                <li className="menu-title">
                                    <span>Wallet Connected</span>
                                </li>
                                <li>
                                    <div className="flex flex-col px-4 py-2 cursor-auto">
                                        <div className="text-sm font-medium truncate">{shortAddress}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Network: {network || '-'}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="flex items-center gap-2"
                                    >
                                        <UserCircleIcon className="w-4 h-4"/>
                                        Profile
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <button
                                    onClick={connectWithMetamask}
                                    className="btn btn-primary btn-sm w-full gap-2"
                                >
                                    <WalletIcon className="w-4 h-4"/>
                                    Connect Wallet
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;