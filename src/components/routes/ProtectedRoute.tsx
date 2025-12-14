import { useSelector } from 'react-redux';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { TypeRootState } from '../../store/store';
import { CircularProgress, Container } from '@mui/material';

interface ProtectedRouteProps {
	children?: React.ReactNode,
  redirectPath: string;
}

const ProtectedRoute = ({ children, redirectPath = '/login' }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading } = useSelector(
		(state: TypeRootState) => state.user
	);

	if (isLoading) {
		return (
			<Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Container>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
