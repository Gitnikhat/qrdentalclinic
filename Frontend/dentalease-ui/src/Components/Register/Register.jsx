import React from "react";
import { FaUser, FaLock, FaPhoneAlt, FaUserClock, FaTransgenderAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";

import './Register.css';

const Register = () => {
    return (
        <div className="wrapper">
            <form action="" method="post">
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" name="name" id="name" placeholder="Full name" required/>
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="text" name="email" id="email" placeholder="Email" required/>
                    <MdMail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" name="phone" id="phone" placeholder="10 digit phone number" required/>
                    <FaPhoneAlt className="icon" />
                </div>
                <div className="input-box">
                    <input type="number" min={5} max={100} name="age" id="age" placeholder="age" required/>
                    <FaUserClock className="icon" />
                </div>
                <div className="input-box">
                    <select name="fender" id="gender">
                        <option className="select-options" disabled selected>Select Gender</option>
                        <option className="select-options" value="Male">Male</option>
                        <option className="select-options" value="Female">Female</option>
                        <option className="select-options" value="Rather">Rather not say</option>
                    </select>
                </div>
                <div className="input-box">
                    <input type="text" maxlength="12" name="adhaar" id="adhaar" placeholder="12 digit adhaar card" required/>
                    <IoMdDocument className="icon" />
                </div>

                <button type="submit">Register</button>  

                <div className="go-back">
                    <a href="/"> Go Back to Login Page</a>
                </div>

            </form>
        </div>
    )
}

export default Register;