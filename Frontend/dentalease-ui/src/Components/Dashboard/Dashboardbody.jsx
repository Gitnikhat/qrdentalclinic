import React , { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaLock, FaTooth} from "react-icons/fa";
import { RxFileText, RxTimer } from "react-icons/rx";
import { MdDelete } from "react-icons/md";


import './dashboard.css';
import './utils.css';

const Dashboardbody = (props) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        description: '',
        visibility: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/treatment', formData);
            console.log('Response:', response.data, "status: ", response.status);
            if (response.status === 200) {
                console.log("200")
                navigate("/manage-treatments");
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


    if (props.type == "Treatment"){
        return (
            <div>
               <main id="main" class="main">
    
                    <div class="pagetitle">
                    <h1>Dashboard </h1>
                    <nav>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active">Manage Treatments</li>
                        </ol>
                    </nav>
                    </div>
    
                    <section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <div className="add-btn-holder">
                <a href="/add-new-treatments" className="btn btn-custom btn-lg page-scroll">Add Treatments</a>
              </div>

              <table class="table datatable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Visibility</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {props.data
                    ? props.data.map((d, i) => (
                        <tr>
                            <td>{d.title}</td>
                            <td>{d.text}</td>
                            <td>{d.duration}</td>
                            <td>{d.visibility}</td>
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
    </section>
    
                </main>
            </div>
        )
    } else if (props.type == "Addtreatment"){
        return (
            <div>
               <main id="main" class="main">
    
                    <div class="pagetitle">
                    <h1>Dashboard </h1>
                    <nav>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item">Manage Treatments</li>
                        <li class="breadcrumb-item active">Add New Treatment</li>
                        </ol>
                    </nav>
                    </div>
    
                    <section class="section">
                        <div class="row">
                            <div class="col-lg-12">

                            <form onSubmit={handleSubmit} method="post">
                                <h1>Add New Treatment</h1>
                                <div className="dash-input-box">
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Treatment Name" required/>
                                    <FaTooth className="icon" />
                                </div>
                                <div className="dash-input-box">
                                    <input type="text" name="duration" id="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (In Minutes)" required/>
                                    <RxTimer className="icon"/>
                                </div>
                                <div className="dash-input-box">
                                    <select name="visibility" id="visibility" value={formData.visibility} onChange={handleChange}>
                                        <option value="">Select visibility</option>
                                        <option value="1">Admin</option>
                                        <option value="2">User</option>
                                        <option value="3">Patient</option>
                                    </select>
                                    <FaLock className="icon" />
                                </div>

                                <div className="dash-input-box">
                                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} cols="30" rows="10" placeholder="Description" required></textarea>
                                    {/* <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Description" required/> */}
                                    <RxFileText className="icon" />
                                </div>

                                <button className="btn btn-custom btn-lg" type="submit">Submit</button>  

                            </form>

                            </div>
                        </div>
                    </section>
    
                </main>
            </div>
        )
    } else if (props.type == "Timeslots"){
        return (
            <div>
               <main id="main" class="main">
    
                    <div class="pagetitle">
                    <h1>Dashboard </h1>
                    <nav>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active">Manage Treatments</li>
                        </ol>
                    </nav>
                    </div>
    
                    <section class="section">
                        calendar
                    </section>
                </main>
            </div>
        )
    } 
    else {
        return (
            <div>
               <main id="main" class="main">
    
                    <div class="pagetitle">
                    <h1>Dashboard sdf {props.type}</h1>
                    <nav>
                        <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                    </div>
    
                    <section class="section dashboard">
                        <div class="row">
                            <p>Custom data</p>
                        </div>
                    </section>
    
                </main>
            </div>
        )
    }

    
}

export default Dashboardbody;