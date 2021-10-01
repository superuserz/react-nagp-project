import React from 'react'
import TransactionDialog from './TransactionDialog'
import './TransactionOverlay.css'

function TransactionOverlay(props) {

    const hideTransactionOverlay = () => {
        props.hideTransactionOverlay();
    }

    return (
        <div id="transaction-overlay" className={props.klass}>
            <TransactionDialog balance={props.balance} profile={props.profile} handleCancelAction={hideTransactionOverlay}></TransactionDialog>
        </div >
    )
}

export default TransactionOverlay
