import {useEffect, useState} from "react";
import {DocumentCertification__factory} from "../../typechain-types";
import {useMetamask} from "../metamask/useMetamask";
import {contractAddress, provider} from "../../../config/config";
import {Notification} from "../../types/Notification";

export const useNotificationsForMyDocs = (myDocumentHashes: string[]) => {
    const {signer} = useMetamask();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            if (!signer || myDocumentHashes.length === 0) return;

            setLoading(true);
            const contract = DocumentCertification__factory.connect(contractAddress, provider);

            try {
                const all: Notification[] = [];

                for (const hash of myDocumentHashes) {
                    const certLogs = await contract.queryFilter(
                        contract.filters.DocumentCertified(hash)
                    );
                    const revokeLogs = await contract.queryFilter(
                        contract.filters.CertificationRevoked(hash)
                    );

                    const certs = await Promise.all(certLogs.map(async (event, i) => {
                        const block = await provider.getBlock(event.blockNumber);
                        return {
                            id: `cert-${hash}-${i}`,
                            type: "certified" as const,
                            documentHash: event.args.docHash,
                            sender: event.args.certifier,
                            timestamp: block!.timestamp,
                        };
                    }));

                    const revokes = await Promise.all(revokeLogs.map(async (event, i) => {
                        const block = await provider.getBlock(event.blockNumber);
                        return {
                            id: `rev-${hash}-${i}`,
                            type: "revoked" as const,
                            documentHash: event.args.docHash,
                            sender: event.args.revoker,
                            timestamp: block!.timestamp,
                            reason: event.args.reason,
                        };
                    }));

                    all.push(...certs, ...revokes);
                }

                all.sort((a, b) => b.timestamp - a.timestamp);
                setNotifications(all);
            } catch (err) {
                console.error("Error fetching notifications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [signer, myDocumentHashes]);

    return {notifications, loading};
};
