import React, { useState, useEffect } from "react";
import axios from "axios";

import Navheader from "./Navheader";
import Sidebar from "./Sidebar";
import Addusers from "./Addusers";
import Footer from "./Footer";

// import "./css-utils/bootstrap/css/bootstrap.min.css";
// import "./css-utils/bootstrap-icons/bootstrap-icons.css";
// import "./css-utils/boxicons/css/boxicons.min.css";
// import "./css-utils/quill/quill.snow.css";
// import "./css-utils/quill/quill.bubble.css";
// import "./css-utils/remixicon/remixicon.css";
// import "./css-utils/simple-datatables/style.css";

const Managesystemusers = () => {

  const user="Admin";
  const body="Manage System Users";
  const [sysusersData, setsysusersData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin/systemusers");
        console.log("admin/systemusers: ", response.data)
        setsysusersData(response.data);
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
      <Addusers type={body} data={sysusersData.data} />
      <Footer />
    </div>
  );
};

export default Managesystemusers ;
