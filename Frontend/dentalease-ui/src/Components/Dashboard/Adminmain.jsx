import React from "react";

import './dashboard.css';
import './utils.css';

const Adminmain = (props) => {

    return (
        <div>
            <main id="main" class="main">

                <div class="pagetitle">
                <h1>Dashboard </h1>
                <nav>
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
                </div>

                <section class="section">
                    <div class="row">
                        Dashboard content
                    </div>
                </section>

            </main>
        </div>
    )
    
}

export default Adminmain;