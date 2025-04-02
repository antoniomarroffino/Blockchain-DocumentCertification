import React from 'react';


interface CertificationStatusProps {
    isCertified: boolean;
    onCertify: () => void;
    document?: File;
}

const CertificationStatus: React.FC<CertificationStatusProps> = ({
                                                                     isCertified,
                                                                     onCertify
                                                                 }) => {
    return (
        <div className="space-y-2"> {/* Ridotto spazio */}
            {!isCertified && (
                <div className="alert alert-warning shadow-lg py-2 px-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">Documento non ancora certificato</span>
                    </div>
                </div>
            )}

            <button
                className={`btn ${isCertified ? 'btn-success' : 'btn-primary'} w-full btn-sm`} // Aggiunto btn-sm
                onClick={onCertify}
                disabled={isCertified}
            >
                {isCertified ? 'Documento Certificato' : 'Certifica Documento'}
            </button>

            {isCertified && (
                <div className="alert alert-success shadow-lg py-2 px-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">Documento Certificato con Successo</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificationStatus;