import { CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useDocumentVerification } from '../hook/blockchain/useDocumentVerification.ts';
import {useEffect} from "react";

interface CertificationBadgeProps {
    docHash: string;
    setIsCertified?: (certified: boolean) => void;
}

const CertificationBadge = ({ docHash, setIsCertified }: CertificationBadgeProps) => {
    const { data: isCertified, isLoading: isVerifying } = useDocumentVerification(docHash || '');

    useEffect(() => {
        if(setIsCertified && isCertified)
            setIsCertified(isCertified);
    }, [isCertified, setIsCertified]);

    if (isVerifying) {
        return (
            <div className="badge gap-2 opacity-50">
                <div className="h-4 w-4 rounded-full bg-base-300 animate-pulse" />
                Verify...
            </div>
        );
    }

    return (
        <span className={`badge gap-2 ${isCertified ? 'badge-success' : 'badge-warning animate-text-pulse'}`}>
      {isCertified ? (
          <>
              <CheckBadgeIcon className="h-4 w-4" />
              Certified
          </>
      ) : (
          <>
              <ExclamationTriangleIcon className="h-4 w-4" />
              Not certified
          </>
      )}
    </span>
    );
};

export default CertificationBadge;