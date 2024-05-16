import React, { useState, useEffect } from "react";
import axios from "axios";

import Navheader from "./Navheader";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Appointment from "./Appointment";

// import "./css-utils/bootstrap/css/bootstrap.min.css";
// import "./css-utils/bootstrap-icons/bootstrap-icons.css";
// import "./css-utils/boxicons/css/boxicons.min.css";
// import "./css-utils/quill/quill.snow.css";
// import "./css-utils/quill/quill.bubble.css";
// import "./css-utils/remixicon/remixicon.css";
// import "./css-utils/simple-datatables/style.css";

const Manageappointments = () => {

  const user="Admin";
  const body="Manage Appointments";
  const [appointmentsData, setappointmentsData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/appointments");
        console.log("appointments: ", response.data)
        setappointmentsData(response.data);
      } catch (error) {
        console.error("Error fetching all system users data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <Navheader />
      <Sidebar user={user}/>
      <Appointment type={body} data={appointmentsData.data} />
      <Footer />
    </div>
  );
};

export default Manageappointments ;
