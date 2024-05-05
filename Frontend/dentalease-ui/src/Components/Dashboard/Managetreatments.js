import React, { useState, useEffect } from "react";
import axios from "axios";

import Navheader from "./Navheader";
import Sidebar from "./Sidebar";
import Dashboardbody from "./Dashboardbody";
import Footer from "./Footer";

// import "./css-utils/bootstrap/css/bootstrap.min.css";
// import "./css-utils/bootstrap-icons/bootstrap-icons.css";
// import "./css-utils/boxicons/css/boxicons.min.css";
// import "./css-utils/quill/quill.snow.css";
// import "./css-utils/quill/quill.bubble.css";
// import "./css-utils/remixicon/remixicon.css";
// import "./css-utils/simple-datatables/style.css";

const Managetreatments = () => {

  const user="Admin";
  const body="Treatment";
  const [treatmentData, setTreatmentData] = useState({});

  useEffect(() => {
    // Fetch available treatment data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/treatment");
        console.log("treatments: ", response.data)
        setTreatmentData(response.data);
      } catch (error) {
        console.error("Error fetching all treatments data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <Navheader />
      <Sidebar user={user}/>
      <Dashboardbody type={body} data={treatmentData.data} />
      <Footer />
    </div>
  );
};

export default Managetreatments ;
