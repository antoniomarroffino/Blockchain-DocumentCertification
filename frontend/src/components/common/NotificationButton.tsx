'use client';

import { BellIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import NotificationPanel from "./NotificationPanel.tsx";
import { useMemo, useState, useRef, useEffect } from "react";
import { useGetAllDocumentsGivenAddressWallet } from "../../hook/backend/useGetAllDocumentsGivenAddressWallet.ts";
import { useNotificationsForMyDocs } from "../../hook/blockchain/useNotifications.ts";

interface NotificationButtonProps {
    address: string;
}

const NotificationButton = ({ address }: NotificationButtonProps) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const { data: myDocs } = useGetAllDocumentsGivenAddressWallet(address);
    const myHashes = useMemo(() => {
        if (!myDocs) return [];
        return myDocs
            .map((doc) => doc.hash)
            .filter((hash): hash is string => typeof hash === "string");
    }, [myDocs]);
    const { notifications } = useNotificationsForMyDocs(myHashes);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showNotifications &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications]);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="p-2 rounded-full hover:bg-neutral-700 transition relative cursor-pointer"
            >
                <BellIcon className="w-6 h-6 text-yellow-400" />
            </button>

            <AnimatePresence>
                {showNotifications && (
                    <NotificationPanel notifications={notifications} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationButton;
