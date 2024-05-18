import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './dashboard.css';
import './utils.css';

import { useUser } from "../Usercontext";

const Usermain = (props) => {
    const { userData } = useUser();
    const { user_id} = userData;

    console.log(user_id, "user id")

    const [totalAppointments, setTotalAppointments] = useState({
        total: 0,
        completed: 0,
        cancelled: 0,
        pending: 0,
    });
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchTotalAppointments();
    }, []);

    useEffect(() => {
        fetchUpcomingAppointments(selectedDate);
    }, [selectedDate]);

    const fetchTotalAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/total-appointments?patient-id=${user_id}`);
            setTotalAppointments(response.data.data);
        } catch (error) {
            console.error('Error fetching total appointments:', error);
        }
    };


    const fetchUpcomingAppointments = async (date) => {
        try {
            const response = await axios.get(`http://localhost:8000/patient/upcoming-appointments?date=${date.toISOString().split('T')[0]}&patient-id=${user_id}`);
            setUpcomingAppointments(response.data.data);
        } catch (error) {
            console.error('Error fetching upcoming appointments:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        {/* Total Appointments Card */}
                        <div className="col-lg-3">
                            <div className="card fixed-height-card-small">
                                <div className="card-body">
                                    <h5 className="card-title">Total</h5>
                                    <div className="d-flex align-items-center">
                                        
                                        <div className="ps-3">
                                            <h6>{totalAppointments.total}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Completed Appointments Card */}
                        <div className="col-lg-3">
                            <div className="card fixed-height-card-small">
                                <div className="card-body">
                                    <h5 className="card-title">Completed</h5>
                                    <div className="d-flex align-items-center">
                                        
                                        <div className="ps-3">
                                            <h6>{totalAppointments.completed}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Completed Appointments Card */}
                        <div className="col-lg-3">
                            <div className="card fixed-height-card-small">
                                <div className="card-body">
                                    <h5 className="card-title">Pending</h5>
                                    <div className="d-flex align-items-center">
                                        <div className="ps-3">
                                            <h6>{totalAppointments.pending}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Completed Appointments Card */}
                        <div className="col-lg-3">
                            <div className="card fixed-height-card-small">
                                <div className="card-body">
                                    <h5 className="card-title">Cancelled</h5>
                                    <div className="d-flex align-items-center">
                                        <div className="ps-3">
                                            <h6>{totalAppointments.cancelled}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        {/* Upcoming Appointments Card */}
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Upcoming Appointments</h5>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>&lt;</button>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control blank-style"
                                        />
                                        <button onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>&gt;</button>
                                    </div>
                                    <div className="scroll-div">
                                        <table className="table datatable">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Treatment</th>
                                                    <th>Doctor Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {upcomingAppointments.length > 0 ? (
                                                    upcomingAppointments.map((appointment, index) => (
                                                        <tr key={index}>
                                                            <td>{appointment.date}</td>
                                                            <td>{appointment.treatment}</td>
                                                            <td>{appointment.doctor_remark}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3">No appointments found</td>
                                                    </tr>
                                                )}
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
    );
};

export default Usermain;
