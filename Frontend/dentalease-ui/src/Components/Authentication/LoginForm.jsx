import React from "react";
import { FaUser, FaLock } from "react-icons/fa";

import './authentication.css';

const LoginForm = () => {

    return (
        <div id="authentication-page">
            <div className="container">
                <div className="row col-lg-10 auth-row offset-lg-1 marg-left" >
                    <div className="col-lg-6">
                        <div className="col-md-12">
                            <h3>Welcome to <h2 className="highlight-h2">Dentalease</h2></h3>
                            <p className="tagline">Your one-stop destination for hassle-free dental appointments.</p>
                        </div>
                        {" "}
                        <img src="img/dentists-treating-patients-teeth-in-the-clinic-vector.jpg" className="img-responsive img-fix-hgt" alt="" />{" "}
                    </div>
                    <div className="col-lg-6 form-div">
                        <div className="auth-wrapper">
                            <form action="" method="post">
                                <h2 className="highlight-h2">Login</h2>
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

                                <button className="btn btn-custom btn-lg" type="submit">Login</button>

                                <div className="register-link">
                                    <p>Don't have an account? <a href="/register">Register</a> </p>
                                </div>                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;