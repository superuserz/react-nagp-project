import React, { useState } from 'react'
import '../register/Register.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password';
import { useFormik } from 'formik';
import { Redirect } from 'react-router';
import { userService } from '../../api/UserService';
import * as constants from '../../shared/constants/AppConstants';



const BLANK = '';
function Login() {

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [redirect, setRedirect] = useState(false);

    const formik = useFormik({
        initialValues: {
            accountNumber: BLANK,
            password: BLANK,
        },
        validate: (data) => {
            let errors = {};

            if (!data.accountNumber) {
                errors.accountNumber = 'Account Number is required.';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);
            formik.resetForm();
            doAuthentication(data);
        }
    });

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to="/home"></Redirect>
        }
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const doAuthentication = (formData) => {
        userService.getUsers().then(data => {
            const user = data.find(element => element.accountNumber === formData.accountNumber);
            if (!user) {
                window.alert(constants.USER_NOR_EXIST);
            } else {
                if (user && user.password === formData.password) {
                    sessionStorage.setItem(constants.LOGGED_IN_KEY, 'true');
                    sessionStorage.removeItem(constants.USER_DATA_KEY);
                    sessionStorage.setItem(constants.USER_DATA_KEY, JSON.stringify(user));
                    setRedirect(true);
                } else {
                    window.alert(constants.INCORRECT_PASSWORD);
                }
            }
        })
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="registration-container">
                    <div className="registration-form-container">

                        <div className="registration-form-input-container">
                            <h4>Account Number</h4>
                            <InputText id="accountNumber" name="accountNumber" type="number" value={formik.values.accountNumber} onChange={formik.handleChange}></InputText>
                            {getFormErrorMessage('accountNumber')}
                        </div>
                        <div className="registration-form-input-container">
                            <h4>Password</h4>
                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} feedback={false} />
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="registration-form-input-container">
                            <hr></hr>
                            <Button type="submit" label="Login" className="p-mt-2" />
                            {renderRedirect()}
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Login
