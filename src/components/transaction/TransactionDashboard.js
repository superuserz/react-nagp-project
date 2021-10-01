import React, { useState } from 'react'
import './TransactionDashboard.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'

function TransactionDashboard(props) {

    const [globalFilter, setGlobalFilter] = useState('');

    const dateBodyTemplate = (rowData) => {
        const object = new Date(rowData.date);
        const datetime = object.toLocaleDateString() + " " + object.toLocaleTimeString();
        return (
            <React.Fragment>
                <span>{datetime}</span>
            </React.Fragment>
        );
    }

    return (
        <div className="dashboard-flex-wrapper">
            <div className="dashboard-container">
                <div class="dashboard-header">
                    <h3>My Transactions</h3>
                    <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search By Description" />
                </div>
                <DataTable value={props.transactions}
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
