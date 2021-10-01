import React, { useEffect, useState } from 'react'
import './Home.css'
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import * as constants from '../../shared/constants/AppConstants';
import TransactionOverlay from '../../components/overlays/transaction/TransactionOverlay';
import TransactionDashboard from '../../components/transaction/TransactionDashboard';
import { userService } from '../../api/UserService';

function Home(props) {

    const [userprofile, setUserprofile] = useState({});
    const [klass, setKlass] = useState('transaction-overlay-hidden');


    useEffect(() => {
        setUserprofile((prevVal) => {
            const userprofile = JSON.parse(sessionStorage.getItem(constants.USER_DATA_KEY));
            if (userprofile) {
                return JSON.parse(sessionStorage.getItem(constants.USER_DATA_KEY));
            } else {
                history.push('/login');
            }

        })
    }, [])

    const history = useHistory();
    const dispatchProfile = () => {
        history.push('/profile');
    }

    const showTransactionOverlay = () => {
        setKlass((prevVal) => {
            return 'transaction-overlay';
        })
    }

    const hideTransactionOverlay = () => {
        setKlass((prevVal) => {
            return 'transaction-overlay-hidden';
        })
        window.location.reload(true);

    }

    const handleLogout = () => {
        userService.invalidateUser();
        history.push('/login');
    }

    return (
        <div>
            <div className="menu-container">
                <header>
                    <h1>Welcome, {userprofile.username}</h1>
                </header>
                <div className="menu-items">
                    <Button type="submit" label="My Profile" className="p-mt-2" onClick={dispatchProfile} />
                    <Button type="submit" label="Withdraw/ Deposit" className="p-mt-2 p-button-success" onClick={showTransactionOverlay} />
                    <Button type="submit" label="Logout" className="p-mt-2 p-button-danger" onClick={handleLogout} />
                    <TransactionOverlay hideTransactionOverlay={hideTransactionOverlay} klass={klass}></TransactionOverlay>
                </div>
            </div>
            <TransactionDashboard></TransactionDashboard>
        </div>
    )
}

export default Home
