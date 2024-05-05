import React, { useState, useEffect } from "react";
import axios from "axios";

import { Aboutus } from "./Components/LandingPage/Aboutus";
import { Contactus } from "./Components/LandingPage/Contactus";
import { Treatments } from "./Components/LandingPage/Treatments";
import { Header } from "./Components/LandingPage/Header";
import { Navbar } from "./Components/LandingPage/Navbar";
import { Docprofile } from "./Components/LandingPage/Docprofile";

// import JsonData from "./data/data.json";
// import SmoothScroll from "smooth-scroll";
// import "./App.css";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [treatmentData, setTreatmentData] = useState({});

  useEffect(() => {
    // Fetch landing page data from local JSON
    setLandingPageData(require("./data/data.json"));
  }, []);

  useEffect(() => {
    // Fetch available treatment data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/treatment");
        setTreatmentData(response.data);
      } catch (error) {
        console.error("Error fetching all treatments data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("Treatments:", treatmentData)

  return (
    <div>
      <Navbar />
      <Header data={landingPageData.Header} />
      <Treatments data={treatmentData.data} />
      <Aboutus data={landingPageData.About} />
      <Docprofile />
      <Contactus data={landingPageData.Contact} />
    </div>
  );
};

export default App;
