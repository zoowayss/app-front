import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = useSelector((state: RootState) => state.user.token);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute; 