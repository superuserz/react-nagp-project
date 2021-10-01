import React, { useEffect, useState } from 'react'
import './Home.css'
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import * as constants from '../../shared/constants/AppConstants';
import TransactionOverlay from '../../components/overlays/transaction/TransactionOverlay';
import TransactionDashboard from '../../components/transaction/TransactionDashboard';
import { userService } from '../../api/UserService';
import Balance from '../../components/transaction/Balance';

function Home(props) {

    const [userprofile, setUserprofile] = useState({});
    const [klass, setKlass] = useState('transaction-overlay-hidden');
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const history = useHistory();

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


    //Effect to set Transaction & Balance Data
    useEffect(() => {
        const userprofile = JSON.parse(sessionStorage.getItem(constants.USER_DATA_KEY));
        if (userprofile) {
            userService.getTransactionsByUserId(userprofile.id).then(response => {
                setTransactions(response);
                const withdrawls = response.filter(transaction => transaction.type === 'WITHDRAWL').reduce(((acc, emp) => acc + Number(emp.amount)), 0);
                const deposits = response.filter(transaction => transaction.type === 'DEPOSIT').reduce(((acc, emp) => acc + Number(emp.amount)), 0);
                setBalance(deposits - withdrawls);
            })
        } else {
            history.push('/login');
        }

    }, []);


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
            <header>
                <h1>Welcome, {userprofile.username}</h1>
            </header>

            <div className="menu-container">
                <div className="menu-items">
                    <Button type="submit" label="My Profile" className="p-mt-2" onClick={dispatchProfile} />
                    <Button type="submit" label="Withdraw/ Deposit" className="p-mt-2 p-button-success" onClick={showTransactionOverlay} />
                    <Button type="submit" label="Logout" className="p-mt-2 p-button-danger" onClick={handleLogout} />
                    <TransactionOverlay hideTransactionOverlay={hideTransactionOverlay} profile={userprofile} klass={klass} balance={balance}></TransactionOverlay>
                </div>
            </div>
            <Balance balance={balance}></Balance>
            <TransactionDashboard transactions={transactions} profile={userprofile}></TransactionDashboard>
        </div>
    )
}

export default Home
