import React from "react";

import './dashboard.css';

const Sidebar = (props) => {

    if (props.user == "Admin"){
        return (
            <div>
                <aside id="sidebar" class="sidebar">
    
                    <ul class="sidebar-nav" id="sidebar-nav">
    
                    <li class="nav-item">
                        <a class="nav-link " href="/admindashboard">
                        <i class="bi bi-grid"></i>
                        <span>Dashboard - {props.user}</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/appointments">
                        <i class="ri-contract-line"></i>
                        <span>Appointments</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/manage-treatments">
                        <i class="ri-tooth-line"></i>
                        <span>Treatments</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/manage-slots">
                        <i class="ri-calendar-schedule-line"></i>
                        <span>Timeslots</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/manage-systemusers">
                        <i class="bi bi-person"></i>
                        <span>Manage System Users</span>
                        </a>
                    </li>
    
                    {/* <li class="nav-item">
                        <a class="nav-link collapsed" href="pages-contact.html">
                        <i class="bi bi-envelope"></i>
                        <span>Contact Us</span>
                        </a>
                    </li> */}
    
                </ul>
    
                </aside>
            </div>
        )
    } else {
        return (
            <div>
                <aside id="sidebar" class="sidebar">
    
                    <ul class="sidebar-nav" id="sidebar-nav">
    
                    <li class="nav-item">
                        <a class="nav-link " href="dashboard">
                        <i class="bi bi-grid"></i>
                        <span>Dashboard</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="index.html">
                        <i class="bi bi-grid"></i>
                        <span>Appointments</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="index.html">
                        <i class="bi bi-grid"></i>
                        <span>Reciepts</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/manageprofile">
                        <i class="bi bi-person"></i>
                        <span>Profile</span>
                        </a>
                    </li>
    
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/faqs">
                        <i class="bi bi-question-circle"></i>
                        <span>F.A.Q</span>
                        </a>
                    </li>
    
                </ul>
    
                </aside>
            </div>
        )
    }

    
}

export default Sidebar;