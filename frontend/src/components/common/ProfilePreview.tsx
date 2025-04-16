import { DocumentTextIcon, CurrencyDollarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const ProfilePreview = ({ address, balance, network }: {
    address?: string;
    balance?: string;
    network?: string;
}) => {
    return (
        <div className="px-4 py-3 space-y-3">
            <div className="flex items-center gap-3">
                <DocumentTextIcon className="w-5 h-5 text-primary" />
                <div className="truncate">
                    <p className="text-xs font-medium text-gray-500">Address</p>
                    <p className="text-sm truncate">{address}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                <div>
                    <p className="text-xs font-medium text-gray-500">Balance</p>
                    <p className="text-sm">{balance ? `${parseFloat(balance).toFixed(4)} ETH` : '-'}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <GlobeAltIcon className="w-5 h-5 text-primary" />
                <div>
                    <p className="text-xs font-medium text-gray-500">Network</p>
                    <p className="text-sm capitalize">{network || '-'}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePreview;