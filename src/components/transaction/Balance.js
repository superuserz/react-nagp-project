import React from 'react'
import './Balance.css'

function Balance(props) {

    return (
        <div>
            <div className="balance-container">
                <h3>My Balance</h3>
                <hr></hr>
                <h3>{props.balance}</h3>
            </div>
        </div>
    )
}

export default Balance
