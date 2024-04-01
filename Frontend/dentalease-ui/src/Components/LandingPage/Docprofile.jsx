import React from "react";

export const Docprofile = (props) => {
  return (
    <div id="doc-profile">
      <div className="container">
        <div className="section-title text-center">
          <h2>Meet Our Expert Dentist</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
              {" "}
              <img src="img/freddy.png" className="img-responsive" alt="" />{" "}
              <h1 className="doc-name">Dr. Freddy Ginwala</h1>
              <p>Dental Surgeon</p>
              <p>Dentalease Clinic India</p>
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="biography">  
                <h4>Biography</h4> 
                <p>A highly skilled and compassionate dentist dedicated to providing exceptional dental care to her patients. With a commitment to excellence and a passion for oral health, Dr. Ginwala strives to create personalized treatment plans tailored to each patient's unique needs. He believes in building trusting relationships based on open communication, empathy, and mutual respect.</p>
                <p>Dr. Ginwala has demonstrated a strong dedication in staying updated on the latest advancements in dentistry. He regularly attends seminars, workshops, and conferences to enhance his skills and knowledge in various dental procedures and techniques.</p>
              </div>
              <div>
                <h4>Qualification </h4>
                <ul>
                  <li>BDS(Bachelor of Dental Surgery)</li>
                  <li>MBBS(Bachelor of Medicine, Bachelor of Surgery)</li>
                </ul>
                <h4>Experience </h4>
                <p>11 years of dedicated service of experience in providing exceptional dental care.</p>
                <h4>Languages </h4>
                <p>English, Hindi, Konkani, Kannada.</p>
              </div>
                <div className="social">
                  <p><b>Follow to know more</b></p>
                  <ul>
                    <li>
                      <a href={props.data ? props.data.facebook : "/"}>
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href={props.data ? props.data.twitter : "/"}>
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={props.data ? props.data.youtube : "/"}>
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
