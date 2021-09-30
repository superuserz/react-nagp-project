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


    return (
        <div className="profile-container">

            <div className="profile-details-container">
                <header className="profile-header">
                    <h3>My Profile</h3>
                </header>
                <div class="profile-data-container">
                    <label>User Name</label>
                    <label>{userprofile.username}</label>
                </div>
                <div class="profile-data-container">
                    <label>Date of Birth</label>
                    <label>{userprofile.dob}</label>
                </div>
                <div class="profile-data-container">
                    <label>Gender</label>
                    <label>{userprofile.gender}</label>
                </div>
                <div class="profile-data-container">
                    <label>Account Type</label>
                    <label>{userprofile.accountType}</label>
                </div>
                <div class="profile-data-container">
                    <label>Account Number</label>
                    <label>{userprofile.accountNumber}</label>
                </div>
                <div class="profile-data-container">
                    <label>City</label>
                    <label>{userprofile.city}</label>
                </div>
                <div class="profile-data-container">
                    <label>District</label>
                    <label>{userprofile.district}</label>
                </div>
            </div>
        </div>

    )
}

export default Profile
