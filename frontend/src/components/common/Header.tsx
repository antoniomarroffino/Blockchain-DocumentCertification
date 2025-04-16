import {useMetamask} from "../../hook/useMetamask.ts";
import {ChevronDownIcon, UserCircleIcon, WalletIcon} from "@heroicons/react/24/outline";
import {ShieldCheckIcon} from "@heroicons/react/16/solid";

const Header = () => {
    const {isConnected, signer, connectWithMetamask} = useMetamask();
    const shortAddress = signer?.address
        ? `${signer.address.slice(0, 6)}...${signer.address.slice(-4)}`
        : "";

    return (
        <div className="navbar bg-base-100 border-b border-base-200 px-6">
            <div className="flex-1">
                <h1 className="text-xl font-bold flex text-primary items-center gap-2">
                    <ShieldCheckIcon className="w-8 h-8"/>
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
                                    <div className="bg-primary/10 text-primary rounded-full w-8">
                                        <span className="text-sm">{shortAddress[0]}</span>
                                    </div>
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
                            <>
                                <WalletIcon className="w-6 h-6 text-primary"/>
                                <span className="hidden md:inline">Connect Wallet</span>
                            </>
                        )}
                        <ChevronDownIcon className="w-4 h-4 ml-1"/>
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
                                    <div className="flex flex-col px-4 py-2">
                                        <div className="text-sm font-medium truncate">{shortAddress}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Network: Ethereum Mainnet
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <UserCircleIcon className="w-4 h-4"/>
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center gap-2 text-error">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Disconnect
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