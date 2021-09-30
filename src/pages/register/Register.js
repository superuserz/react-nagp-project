import React, { useRef, useState } from 'react'
import './Register.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import * as constants from '../../shared/constants/AppConstants'
import { userService } from '../../api/UserService';
import { Messages } from 'primereact/messages';

function Register() {
    const messages = useRef(null);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const formik = useFormik({
        initialValues: {
            username: '',
            dob: '',
            gender: '',
            accountType: '',
            accountNumber: '',
            city: '',
            district: '',
            password: '',
            confirmPassword: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'Account Number is required.';
            }

            if (!data.dob) {
                errors.dob = 'Date of Birth is required.';
            }

            if (!data.gender) {
                errors.gender = 'Gender is required.';
            }

            if (!data.accountType) {
                errors.accountType = 'Account Type is required.';
            }
            if (!data.city) {
                errors.city = 'City is required.';
            }

            if (!data.district) {
                errors.district = 'District is required.';
            }
            if (!data.accountNumber) {
                errors.accountNumber = 'Account Number is required.';
            }

            if (!data.confirmPassword) {
                errors.confirmPassword = 'Password is required.';
            }

            if (!data.password) {
                errors.password = 'Confirm Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);
            formik.resetForm();
            userService.registerUser(data);
            messages.current.show({ severity: 'success', summary: 'User Registration Successfull. Kindly proceed to Login' });
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div>
            <Messages ref={messages}></Messages>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="registration-container">
                    <div className="registration-form-container">
                        <div className="registration-form-input-container">
                            <h4>Username</h4>
                            <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange}></InputText>
                            {getFormErrorMessage('username')}
                        </div>
                        <div className="registration-form-input-container">
                            <h4>Date of Birth</h4>
                            <Calendar id="dob" name="dob" dateFormat="dd/mm/yy" value={formik.values.dob} onChange={formik.handleChange} monthNavigator yearNavigator yearRange="1900:2021" />
                            {getFormErrorMessage('dob')}
                        </div>
                        <div className="registration-form-input-container">
                            <h4>Gender</h4>
                            <Dropdown id="gender" name="gender" value={formik.values.gender} options={constants.GENDERS} onChange={formik.handleChange} placeholder="Select Gender" />
                            {getFormErrorMessage('gender')}
                        </div>
                        <div className="registration-form-input-container">
                            <h4>Address</h4>
                            <Dropdown id="city" name="city" value={formik.values.city} options={constants.STATES} onChange={formik.handleChange} placeholder="Select State" />
                            <Dropdown id="district" name="district" value={formik.values.district} options={constants.DISTRICTS} onChange={formik.handleChange} placeholder="Select District" />
                            {getFormErrorMessage('city')}
                            {getFormErrorMessage('district')}
                        </div>
                    </div>
                    <div className="registration-form-container">
                        <div className="registration-form-input-container">
                            <h4>Account Type</h4>
                            <Dropdown id="accountType" name="accountType" value={formik.values.accountType} options={constants.ACCOUNT_TYPES} onChange={formik.handleChange} placeholder="Select Account Type" />
                            {getFormErrorMessage('accountType')}
                        </div>
                        <div className="registration-form-input-container">
                            <h4>Account Number</h4>
                            <InputText id="accountNumber" name="accountNumber" type="number" value={formik.values.accountNumber} onChange={formik.handleChange}></InputText>
                            {getFormErrorMessage('accountNumber')}
                        </div>
                        <div className="registration-form-input-container">
                            <h4>Password</h4>
                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="registration-form-input-container">
                            <h4>Confirm Password</h4>
                            <Password id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} feedback={false} />
                            {getFormErrorMessage('confirmPassword')}
                        </div>

                        <div className="registration-form-input-container">
                            <hr></hr>
                            <Button type="submit" label="Register" className="p-mt-2" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
