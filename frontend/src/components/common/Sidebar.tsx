import {useLocation, useNavigate} from "react-router-dom";
import {useMetamask} from "../../hook/useMetamask.ts";
import { HomeIcon } from "@heroicons/react/24/solid";
import {ArrowUpTrayIcon, DocumentIcon, FolderIcon} from "@heroicons/react/16/solid";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {isConnected} = useMetamask();

    const menuItems = [
        {path: '/', label: 'Dashboard', icon: <HomeIcon className="w-5 h-5"/>},
        {path: '/uploadDocument', label: 'Upload Document', icon: <ArrowUpTrayIcon className="w-5 h-5" />},
        {path: '/myDocuments', label: 'My Documents', icon: <FolderIcon className="w-5 h-5" /> },
        { path: '/allDocuments', label: 'All Documents', icon: <DocumentIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="w-64 min-h-screen bg-base-100 border-r border-base-300 flex flex-col">
            <nav className="flex-1 px-3 py-4">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all cursor-pointer
                ${location.pathname === item.path
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'hover:bg-base-200 text-base-content/80'}`}
                        >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
            {isConnected && (
                <div className="p-4 border-t border-base-300">
                    <div className="text-sm font-medium">Network Status</div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="badge badge-success badge-xs"></div>
                        <span>Ethereum Mainnet</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;