import './App.css';
import {Header} from './components/header/Header';
import {Footer} from './components/footer/Footer';
import {NoMatch} from './containers/errorPage/NoMatch';
import {PublicRoute} from './components/publicRoute/PublicRoute';
import {PrivateRoute} from './components/privateRoute/PrivateRoute';
import {OwnFeed} from './containers/feedPage/ownFeed/OwnFeed';
import {OtherFeed} from './containers/feedPage/otherFeed/OtherFeed';

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useState} from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] =
        useState(localStorage.getItem('isLoggedIn') === 'true');
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [isDriver, setIsDriver] = useState(localStorage.getItem('isDriver') === 'true');
    const [isDriverRights, setIsDriverRights] = useState(localStorage.getItem('isDriverRights') === 'true');

    return (
        <BrowserRouter>
            <div className='App'>
                <Header
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isDriver={isDriver}
                    setIsDriver={setIsDriver}
                    isDriverRights={isDriverRights}
                />

                <main>
                    <Routes>
                        <Route path='/' element={
                            isLoggedIn ?
                                <Navigate to='/feed'/>
                                : <Navigate to='/login' />
                        }/>
                        <Route
                            path='/login'
                            element=
                                {<PublicRoute
                                    isLoggedIn={isLoggedIn}
                                    setIsLoggedIn={setIsLoggedIn}
                                    setUsername={setUsername}
                                    setIsDriverRights={setIsDriverRights}
                                    isDriverRights={isDriverRights}
                                />}
                        />
                        <Route
                            path='/feed'
                            element=
                                {<PrivateRoute
                                    isLoggedIn={isLoggedIn}
                                    isDriver={isDriver}
                                    component={<OtherFeed isDriver={isDriver}/>}
                                />}
                        />
                        <Route
                            path='/myFeed'
                            element=
                                {<PrivateRoute
                                    isLoggedIn={isLoggedIn}
                                    component={<OwnFeed isDriver={isDriver}/>}
                                />}
                        />
                        <Route
                            path='/404'
                            element={<NoMatch/>}
                        />
                        <Route
                            path='*'
                            element={<Navigate to='/404'/>}
                        />
                    </Routes>
                </main>

                <Footer year={new Date().getFullYear()}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
