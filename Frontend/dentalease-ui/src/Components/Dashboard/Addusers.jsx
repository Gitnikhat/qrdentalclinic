import React , { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaLock, FaPhone, FaUser} from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import './dashboard.css';
import './utils.css';

const Addusers = (props) => {
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        usertype: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/admin/systemusers', formData);
            console.log('Response:', response.data, "status: ", response.status);
            if (response.data.status === 201) {
                console.log("200")
                navigate("/manage-systemusers");
            }else {
                const { msg } = response.data; // Corrected this line
                setMsg(msg); // Set the message in the state
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleDelete = (deleteUrl) => {
        return async () => {
            try {
                const response = await axios.delete(deleteUrl);
                if (response.status === 200) {
                    // If the deletion is successful, reload the page
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error deleting resource:', error);
            }
        };
    };

    if (props.type == "Manage System Users"){
        return (
            <div>
               <main id="main" class="main">
    
                    <div class="pagetitle">
                    <h1>System Users </h1>
                    <nav>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active">Manage System Users</li>
                        </ol>
                    </nav>
                    </div>
    
                    <section class="section">
                        <div class="row">
                            <div class="col-lg-12">

                            <div class="card">
                                <div class="card-body">
                                <div className="add-btn-holder">
                                    <a href="/add-new-system-users" className="btn btn-custom btn-lg page-scroll small-font">Add System Users</a>
                                </div>
                                <div className="scroll-div">
                                <table class="table datatable">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email / Username</th>
                                        <th>Phone</th>
                                        <th>Usertype</th>
                                        <th>Active</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {props.data
                                        ? props.data.map((d, i) => (
                                            <tr>
                                                <td>{d.name}</td>
                                                <td>{d.email}</td>
                                                <td>{d.phone}</td>
                                                <td>{d.usertype}</td>
                                                <td>{d.active}</td>
                                                <td>
                                                    <button onClick={handleDelete(d.delete_url)} className="delete-btn">
                                                        <MdDelete className="icon" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        : "Loading..."}
                                    </tbody>
                                </table>
                                </div>

                                
                                </div>
                            </div>

                            </div>
                        </div>
                    </section>
    
                </main>
            </div>
        )
    } else {
        return (
            <div>
               <main id="main" class="main">
    
                    <div class="pagetitle">
                    <h1>Dashboard </h1>
                    <nav>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active">Add New User</li>
                        </ol>
                    </nav>
                    </div>
    
                    <section class="section">
                        <div class="row">
                            <div class="col-lg-12">

                            <form onSubmit={handleSubmit} method="post">
                                <h1>Add New User</h1>
                                
                                <div className="dash-input-box">
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required/>
                                    <FaUser className="icon" />
                                </div>
                                <div className="dash-input-box">
                                    <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required/>
                                    <FaPhone className="icon"/>
                                </div>
                                <div className="dash-input-box">
                                    <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="User Email / Username" required/>
                                    <MdMail className="icon"/>
                                </div>
                                <div className="dash-input-box">
                                    <select name="usertype" id="usertype" value={formData.usertype} onChange={handleChange}>
                                        <option value="">Select usertype</option>
                                        <option value="1">Admin</option>
                                        <option value="2">User</option>
                                        <option value="3">Patient</option>
                                    </select>
                                    <FaLock className="icon" />
                                </div>
                                {msg && <p className="error-message">{msg}</p>}
                                <button className="btn btn-custom btn-lg" type="submit">Submit</button>  

                            </form>

                            </div>
                        </div>
                    </section>
    
                </main>
            </div>
        )
    }     
}

export default Addusers;