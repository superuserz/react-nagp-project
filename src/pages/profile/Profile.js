import React, { useEffect, useState } from 'react';
import './Profile.css';
import * as constants from '../../shared/constants/AppConstants';

function Profile() {

    const [userprofile, setUserprofile] = useState({});
    useEffect(() => {

        const data = JSON.parse(sessionStorage.getItem(constants.USER_DATA_KEY));
        setUserprofile((prevVal) => {
            return data;
        })
    }, [])

    const getDOB = () => {
        const dob = new Date(userprofile.dob);
        return dob.getDate() + '/' + dob.getMonth() + '/' + dob.getFullYear();
    }


    return (
        <div className="profile-container">

            <div className="profile-details-container">
                <header className="profile-header">
                    <h3>My Profile</h3>
                </header>
                <div className="profile-data-container">
                    <label>User Name</label>
                    <label>{userprofile.username}</label>
                </div>
                <div className="profile-data-container">
                    <label>Date of Birth</label>
                    <label>{getDOB()}</label>
                </div>
                <div className="profile-data-container">
                    <label>Gender</label>
                    <label>{userprofile.gender}</label>
                </div>
                <div className="profile-data-container">
                    <label>Account Type</label>
                    <label>{userprofile.accountType}</label>
                </div>
                <div className="profile-data-container">
                    <label>Account Number</label>
                    <label>{userprofile.accountNumber}</label>
                </div>
                <div className="profile-data-container">
                    <label>City</label>
                    <label>{userprofile.city}</label>
                </div>
                <div className="profile-data-container">
                    <label>District</label>
                    <label>{userprofile.district}</label>
                </div>
            </div>
        </div>

    )
}

export default Profile
