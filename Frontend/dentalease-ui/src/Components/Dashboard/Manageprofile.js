import React, { useState, useEffect } from "react";
import axios from "axios";

import Navheader from "./Navheader";
import Sidebar from "./Sidebar";
import Addusers from "./Addusers";
import Footer from "./Footer";
import Profile from "./Profile";

// import "./css-utils/bootstrap/css/bootstrap.min.css";
// import "./css-utils/bootstrap-icons/bootstrap-icons.css";
// import "./css-utils/boxicons/css/boxicons.min.css";
// import "./css-utils/quill/quill.snow.css";
// import "./css-utils/quill/quill.bubble.css";
// import "./css-utils/remixicon/remixicon.css";
// import "./css-utils/simple-datatables/style.css";

const Manageprofile = () => {

  const user="Patient";
  const body="Profile";
  const [sysusersData, setsysusersData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/profile?id=5dad6a44-fa1a-4d42-b586-e157f8b7ad50");
        console.log("profile: ", response.data)
        setsysusersData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <Navheader />
      <Sidebar user={user}/>
      <Profile type={body} data={sysusersData.data} />
      <Footer />
    </div>
  );
};

export default Manageprofile ;
