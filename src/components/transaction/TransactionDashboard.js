import React, { useEffect, useState } from 'react'
import './TransactionDashboard.css'
import { DataTable } from 'primereact/datatable';
import { userService } from '../../api/UserService';
import { Column } from 'primereact/column';
import * as constants from '../../shared/constants/AppConstants';
import { InputText } from 'primereact/inputtext'
import { useHistory } from 'react-router-dom';

function TransactionDashboard(props) {

    const [transactions, setTransactions] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const history = useHistory();

    useEffect(() => {
        const userprofile = JSON.parse(sessionStorage.getItem(constants.USER_DATA_KEY));
        if (userprofile) {
            userService.getTransactionsByUserId(userprofile.id).then(response => {
                setTransactions(response);
            })
        } else {
            history.push('/login');
        }

    }, []);

    const dateBodyTemplate = (rowData) => {
        const object = new Date(rowData.date);
        const datetime = object.toLocaleDateString() + " " + object.toLocaleTimeString();
        return (
            <React.Fragment>
                <span>{datetime}</span>
            </React.Fragment>
        );
    }

    const getBalance = () => {
        const withdrawls = transactions.filter(transaction => transaction.type === 'WITHDRAWL').reduce(((acc, emp) => acc + Number(emp.amount)), 0);
        const deposits = transactions.filter(transaction => transaction.type === 'DEPOSIT').reduce(((acc, emp) => acc + Number(emp.amount)), 0);
        return deposits - withdrawls;

    }

    return (
        <div className="dashboard-flex-wrapper">
            <div className="balance-container">
                <h3>My Balance</h3>
                <hr></hr>
                <h3>{getBalance()}</h3>
            </div>
            <div className="dashboard-container">
                <div class="dashboard-header">
                    <h3>My Transactions</h3>
                    <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search By Description" />
                </div>
                <span>{JSON.stringify(props.transactions)}</span>
                <DataTable value={transactions}
                    className="p-datatable-transactions"
                    emptyMessage="No Transactions Found."
                    globalFilter={globalFilter}
                    scrollable="true"
                    scrollHeight="100%">
                    <Column field="type" header="Transaction Type" />
                    <Column field="amount" header="Transaction Amount" />
                    <Column field="date" header="Transaction Date" body={dateBodyTemplate} />
                    <Column field="description" header="Description" />
                </DataTable>
            </div>
        </div>

    )
}

export default TransactionDashboard
