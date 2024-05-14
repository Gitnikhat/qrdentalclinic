import React from "react";

import Navheader from "./Navheader";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Faqs from "./Faqs";

// import "./css-utils/bootstrap/css/bootstrap.min.css";
// import "./css-utils/bootstrap-icons/bootstrap-icons.css";
// import "./css-utils/boxicons/css/boxicons.min.css";
// import "./css-utils/quill/quill.snow.css";
// import "./css-utils/quill/quill.bubble.css";
// import "./css-utils/remixicon/remixicon.css";
// import "./css-utils/simple-datatables/style.css";

const Viewfaq = () => {

  const user="Patient";

  return (
    <div>
      <Navheader />
      <Sidebar />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Viewfaq ;
