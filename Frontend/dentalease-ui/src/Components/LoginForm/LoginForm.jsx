import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import './LoginForm.css';

const LoginForm = () => {

    return (
        <div className="wrapper">
            <form action="" method="post">
                <h1>Login</h1>

                <div className="input-box">
                    <input type="text" name="username" id="username" placeholder="Username" required/>
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" name="password" id="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>

                <div className="forgot-password">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="/register">Register</a> </p>
                </div>                
            </form>
        </div>
    )
}

export default LoginForm;