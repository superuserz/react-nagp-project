import React, { useState } from 'react'
import './TransactionDialog.css'
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';


function TransactionDialog(props) {

    const [type, setType] = useState('DEPOSIT');
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState('');

    const handleCancelAction = () => {
        props.handleCancelAction();
    }

    const executeTransactionRequest = () => {
        const requestPayload = buildTransactionRequest();
        //After this send payload to JSON SERVER.
    }

    const buildTransactionRequest = () => {
        const payload = {
            "type": type,
            "amount": amount,
            "date": new Date(),
            "description": description
        }
        console.log(payload);
    }

    return (
        <div className="centered-dialog">
            <div className="header">
                <h3>Make your Transaction</h3>
            </div>
            <div className="main">
                <label>Select Transaction type</label>
                <label>Withdrawl</label>
                <RadioButton id="r1" value="WITHDRAWL" name="r1" onChange={(e) => setType(e.target.value)} checked={type === 'WITHDRAWL'} />
                <label>Deposit</label>
                <RadioButton id="r2" value="DEPOSIT" name="r2" onChange={(e) => setType(e.target.value)} checked={type === 'DEPOSIT'} />
            </div>
            <div className="main">
                <label>Current Balance in Account</label>
                <InputText id="balance" name="balance" disabled={true} type="text" value="100.00"></InputText>
            </div>
            <div className="main">
                <label>Transaction Amount</label>
                <InputText id="amount" name="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount"></InputText>
            </div>
            <div className="main">
                <label>Description</label>
                <InputText id="description" name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Remark"></InputText>
            </div>
            <div className="footer">
                <Button label="Transact" className="p-button-raised p-button-rounded" onClick={executeTransactionRequest} />
                <Button label="Cancel" className="p-button-raised p-button-rounded p-button-danger" onClick={handleCancelAction} />
            </div>
        </div>
    )
}

export default TransactionDialog
