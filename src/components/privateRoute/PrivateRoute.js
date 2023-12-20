import {Navigate} from 'react-router-dom';
import {OtherFeed} from '../../containers/feedPage/otherFeed/OtherFeed';

export const PrivateRoute = ({
    isLoggedIn,
    component
}) => {
    return (
        (!isLoggedIn) ? <Navigate to='/login'/> : component
    );
}