import React, { useState, useEffect } from "react";

import { Aboutus } from "./Components/LandingPage/Aboutus";
import { Contactus } from "./Components/LandingPage/Contactus";
import { Feature } from "./Components/LandingPage/Features";
import { Header } from "./Components/LandingPage/Header";
import { Navbar } from "./Components/LandingPage/Navbar";
import { Docprofile } from "./Components/LandingPage/Docprofile";

import JsonData from "./data/data.json";
// import SmoothScroll from "smooth-scroll";
import "./App.css";

// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// });

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navbar />
      <Header data={landingPageData.Header} />
      <Feature data={landingPageData.Features} />
      <Aboutus data={landingPageData.About} />
      <Docprofile />
      <Contactus data={landingPageData.Contact} />
    </div>
  );
};

export default App;
