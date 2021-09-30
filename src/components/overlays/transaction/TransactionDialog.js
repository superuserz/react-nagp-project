import React, { useEffect, useRef, useState } from 'react'
import './TransactionDialog.css'
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import * as constants from '../../../shared/constants/AppConstants';
import { userService } from '../../../api/UserService';
import { Messages } from 'primereact/messages';


function TransactionDialog(props) {
    const messages = useRef(null);

    const [userprofile, setUserprofile] = useState({});
    useEffect(() => {

        const data = JSON.parse(sessionStorage.getItem(constants.USER_DATA_KEY));
        setUserprofile((prevVal) => {
            return data;
        })
    }, [])

    const [type, setType] = useState('DEPOSIT');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');

    const handleCancelAction = () => {
        props.handleCancelAction();
    }

    const executeTransactionRequest = () => {
        const obj = {
            "userId": userprofile.id,
            "type": type,
            "amount": amount,
            "date": new Date(),
            "description": description
        }
        userService.executeTransaction(obj);
        messages.current.show({ severity: 'success', summary: 'Transaction Successful' });

    }

    return (
        <div className="centered-dialog">
            <Messages ref={messages}></Messages>
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
