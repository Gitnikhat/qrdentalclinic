import React from "react";
import { MdMail } from "react-icons/md";

import './ForgotPassword.css';

const ForgotPassword = () => {
    return (
        <div className="wrapper">
            <form action="" method="post">
                <h1>Forgot Password</h1>
                <br />
                <p>Please enter your registered email address and click the button below to receive the password reset link.</p>

                <div className="input-box">
                    <input type="text" name="email" id="email" placeholder="Registered Email Id" required/>
                    <MdMail className="icon"/>
                </div>

                <button type="submit">Send Reset Link</button>  

                <div className="go-back">
                    <a href="/"> Go Back to Login Page</a>
                </div>

            </form>
        </div>
    )
}

export default ForgotPassword;