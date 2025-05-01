import {useEffect, useState} from "react";
import {DocumentCertification__factory} from "../../typechain-types";
import {useMetamask} from "../metamask/useMetamask";
import {ROLES} from "../../types/roles.ts";
import {contractAddress} from "../../../config/config.ts";

export const useCertifierList = () => {
    const {signer} = useMetamask();
    const [certifiers, setCertifiers] = useState<string[]>([]);
    const [currentAddress, setCurrentAddress] = useState<string>("");

    const fetchCertifiers = async () => {
        if (!signer) return;
        const contract = DocumentCertification__factory.connect(contractAddress, signer);

        try {
            const address = await signer.getAddress();
            setCurrentAddress(address.toLowerCase());

            const grantedLogs = await contract.queryFilter(
                contract.filters.RoleGranted(ROLES.CERTIFIER)
            );

            const allGranted = grantedLogs.map(log => log.args.account.toLowerCase());
            const uniqueAddresses = [...new Set(allGranted)];

            // Check actual role state
            const activeCertifiers: string[] = [];

            for (const addr of uniqueAddresses) {
                const has = await contract.hasRole(ROLES.CERTIFIER, addr);
                if (has) activeCertifiers.push(addr);
            }

            setCertifiers(activeCertifiers);
        } catch (err) {
            console.error("Error fetching certifiers:", err);
        }
    };


    useEffect(() => {
        fetchCertifiers();
    }, [signer]);

    return {
        certifiers,
        currentAddress,
        refetch: fetchCertifiers
    };
};
