import React, { useRef, useState } from 'react'
import './TransactionDialog.css'
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { userService } from '../../../api/UserService';
import { Messages } from 'primereact/messages';


function TransactionDialog(props) {
    const messages = useRef(null);
    const [type, setType] = useState('DEPOSIT');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');

    const handleCancelAction = () => {
        props.handleCancelAction();
    }

    const executeTransactionRequest = () => {
        const obj = {
            "userId": props.profile.id,
            "type": type,
            "amount": Number(amount),
            "date": new Date(),
            "description": description
        }
        if (amount < 1) {
            messages.current.show({ severity: 'error', summary: 'Please Enter a Valid Non-Zero Amount' });
            return;
        }
        if (props.balance - amount < 0 && type === 'WITHDRAWL') {
            messages.current.show({ severity: 'error', summary: 'Insufficient Balance' });
            return;
        }
        if (props.balance < 10000 && type === 'WITHDRAWL') {
            messages.current.show({ severity: 'error', summary: 'Withrawl not Allowed. Balance should be above 10,000 INR' });
            return;
        }
        userService.executeTransaction(obj);
        messages.current.show({ severity: 'success', summary: 'Transaction Successful' });

    }

    return (
        <div className="centered-dialog">
            <Messages ref={messages}></Messages>
            <div className="header">
                <h3>Make your Transaction, {props.profile.username}</h3>
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
                <InputText id="balance" name="balance" disabled={true} type="text" value={props.balance}></InputText>
            </div>
            <div className="main">
                <label>Transaction Amount<span className="required">*</span></label>
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
