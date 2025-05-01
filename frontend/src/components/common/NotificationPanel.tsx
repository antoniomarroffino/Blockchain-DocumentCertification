'use client';

import React from "react";
import { BellIcon, ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import {Notification} from "../../types/Notification";

interface Props {
    notifications: Notification[];
}

const NotificationPanel: React.FC<Props> = ({ notifications }) => {
    const formatTime = (timestamp: number) =>
        new Date(Number(timestamp) * 1000).toLocaleString();

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-14 w-96 max-h-[26rem] bg-neutral-900 border border-yellow-500 rounded-2xl shadow-2xl z-40 overflow-y-auto"
        >
            <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-700 pb-2">
                    <BellIcon className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-white font-semibold text-base">Notifications</h3>
                </div>

                {notifications.length === 0 ? (
                    <p className="text-neutral-400 text-sm text-center py-4">No new notifications.</p>
                ) : (
                    notifications
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((notif) => (
                            <div
                                key={notif.id}
                                className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition"
                            >
                                <div className="pt-1">
                                    {notif.type === "certified" ? (
                                        <CheckCircleIcon className="h-5 w-5 text-green-400" />
                                    ) : (
                                        <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                                    )}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-white leading-snug">
                                        Document <code className="font-mono">{notif.documentHash.slice(0, 10)}...</code>{" "}
                                        was{" "}
                                        <span className={notif.type === "certified" ? "text-green-400" : "text-red-400"}>
                                            {notif.type === "certified" ? "certified" : "revoked"}
                                        </span>.
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                        {formatTime(notif.timestamp)} by{" "}
                                        <span className="font-mono">{notif.sender.slice(0, 10)}...</span>
                                    </p>
                                    {notif.reason && (
                                        <p className="text-xs text-orange-300 italic">Reason: {notif.reason}</p>
                                    )}
                                </div>
                            </div>
                        ))
                )}
            </div>
        </motion.div>
    );
};

export default NotificationPanel;
