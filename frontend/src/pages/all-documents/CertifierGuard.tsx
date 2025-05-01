'use client';

import React from 'react';
import {useUserRole} from '../../hook/blockchain/useUserRole';

interface CertifierGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const CertifierGuard: React.FC<CertifierGuardProps> = ({children, fallback = null}) => {
    const {role, isLoading} = useUserRole();

    if (isLoading) return null;

    return (role === 'Certifier' || role === 'Admin') ? <>{children}</> : <>{fallback}</>;
};

export default CertifierGuard;
