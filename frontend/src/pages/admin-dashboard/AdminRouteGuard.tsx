import React from "react";
import {Navigate} from "react-router-dom";
import {useUserRole} from "../../hook/blockchain/useUserRole";
import LoadingOverlay from "../../components/common/LoadingOverlay";

interface Props {
    children: React.ReactNode;
}

const AdminRouteGuard = ({children}: Props) => {
    const {role, isLoading} = useUserRole();

    if (isLoading) return <LoadingOverlay message="Checking admin permissions..."/>;

    return role === "Admin" ? <>{children}</> : <Navigate to="/" replace/>;
};

export default AdminRouteGuard;
