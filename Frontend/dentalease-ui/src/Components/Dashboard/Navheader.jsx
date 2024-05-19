import React from "react";

import './dashboard.css';

import { useUser } from "../Usercontext";

const Navheader = () => {
    const { userData } = useUser();
    const { user_name} = userData;


    return (
        <div>
            <header id="header" class="header navbar-fixed-top align-items-center dash-flex-header">
                <div class="d-flex align-items-center justify-content-between">
                    <a href="/dashboard" class="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt=""/>
                        <span class="d-none d-lg-block">Dentalease</span>
                    </a>
                </div>

                <nav class="header-nav ms-auto">
                    <ul class="d-flex align-items-center">

                        <li class="nav-item d-block d-lg-none">
                        <a class="nav-link nav-icon search-bar-toggle " href="#">
                            <i class="bi bi-search"></i>
                        </a>
                        </li>

                        <li class="nav-item dropdown pe-3">

                        <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            <span class="d-none d-md-block dropdown-toggle ps-2 margin-right-ten">{user_name}  {"  "}</span>
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li>
                            <a class="dropdown-item d-flex align-items-center" href="/manageprofile">
                                <i class="bi bi-person"></i>
                                <span>My Profile</span>
                            </a>
                            </li>
                            <li>
                            <hr class="dropdown-divider"/>
                            </li>
                            <li>
                            <hr class="dropdown-divider"/>
                            </li>

                            <li>
                            <a class="dropdown-item d-flex align-items-center" href="/logout">
                                <i class="bi bi-box-arrow-right"></i>
                                <span>Sign Out</span>
                            </a>
                            </li>

                        </ul>
                        </li>

                    </ul>
                </nav>

            </header>
        </div>
    )
}

export default Navheader;