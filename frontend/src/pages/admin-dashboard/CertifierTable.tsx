'use client';

import React from "react";

interface Props {
    certifiers: string[];
    currentAddress: string;
    loading: boolean;
    onRevoke: (address: string) => void;
}

const CertifierTable: React.FC<Props> = ({certifiers, currentAddress, loading, onRevoke}) => {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full text-white">
                <thead className="bg-neutral-700">
                <tr>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {certifiers.map((address) => (
                    <tr key={address} className="bg-neutral-800 hover:bg-neutral-700">
                        <td className="font-mono break-all">{address}</td>
                        <td>
                            {address !== currentAddress.toLowerCase() ? (
                                <button
                                    onClick={() => onRevoke(address)}
                                    disabled={loading}
                                    className="btn btn-sm btn-error"
                                >
                                    Revoke
                                </button>
                            ) : (
                                <span className="text-neutral-500 text-sm italic">(You)</span>
                            )}
                        </td>
                    </tr>
                ))}
                {certifiers.length === 0 && (
                    <tr>
                        <td colSpan={2} className="text-center text-neutral-400">
                            No certifiers found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default CertifierTable;
