import React from "react";


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

const Addsystemusers = () => {

  const user="Admin";
  const body="Addusers";

  return (
    <div>
      <Navheader />
      <Sidebar user={user}/>
      <Addusers type={body} />
      <Footer />
    </div>
  );
};

export default Addsystemusers ;
