import React, { useState, useEffect } from "react";
import axios from "axios";

import './calendar.css';
import './dashboard.css';
import './utils.css';


const Timeslotcalendar = (props) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [holidayType, setHolidayType] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [monthData, setMonthData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/timeslot?year=${year}&month=${month}`);
                console.log("response", response);
                setMonthData(response.data.data);
            } catch (error) {
                console.error("Error fetching month data:", error);
            }
        };
        fetchData();
    }, [year, month]);
  
    const handleDateClick = (date) => {
        console.log("Clicked date:", date);
        console.log("Month data:", monthData);
        setSelectedDate(date);
        setModalOpen(true);
        const selectedDateData = monthData.find(data => data.date === date);
        console.log("Selected date data:", selectedDateData);
        setHolidayType(selectedDateData?.holiday ? "cancel" : "mark");
    };
    
  
    const handleModalClose = () => {
      setModalOpen(false);
      setSelectedDate(null);
      setHolidayType(null);
    };
  
    const handleMarkAsHoliday = async () => {
      try {
        const response = await axios.post("http://localhost:8000/timeslot", {
          selected_date: selectedDate,
          holiday: true,
        });
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error("Error marking holiday:", error);
      }
      handleModalClose();
    };

    const handleCancelHoliday = async () => {
      try {
        const response = await axios.post("http://localhost:8000/timeslot", {
            selected_date: selectedDate,
            holiday: false,
        });
        window.location.reload();
      } catch (error) {
        console.error("Error canceling holiday:", error);
      }
      handleModalClose();
    };
  
    const today = new Date();
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 for Sunday, 1 for Monday, ...
    const calendarDates = Array.from({ length: lastDayOfMonth }, (_, index) => index + 1);
    const emptySlots = Array.from({ length: firstDayOfMonth }, (_, index) => null);
  
    return (
        <div>
            <main id="main" className="main">

                <div className="pagetitle">
                <h1>Dashboard </h1>
                <nav>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li className="breadcrumb-item active">Manage Time Slots</li>
                    </ol>
                </nav>
                </div>

                <section className="section">
                    <div className="row">
                    <div className="calendar-container">
                        <div className="calendar-header">
                            <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                                <option value={1}>January</option>
                                <option value={2}>February</option>
                                <option value={3}>March</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>June</option>
                                <option value={7}>July</option>
                                <option value={8}>August</option>
                                <option value={9}>September</option>
                                <option value={10}>October</option>
                                <option value={11}>November</option>
                                <option value={12}>December</option>
                            </select>
                            <button onClick={() => setYear(year - 1)} disabled={year <= 2024}>&lt;</button>
                            <span>{year}</span>
                            <button onClick={() => setYear(year + 1)} disabled={year >= 2030}>&gt;</button>
                        </div>
                        <div className="weekdays">
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                        </div>
                        <div className="calendar">
                            {emptySlots.map((_, index) => (
                                <button
                                    key={`empty-${index}`}
                                    className="calendar-date empty"
                                    disabled
                                ></button>
                            ))}
                           {calendarDates.map((date, index) => (
                                <button
                                    key={date}
                                    className={`calendar-date ${monthData[index]?.holiday ? 'holiday' : ''}`}
                                    onClick={() => handleDateClick(monthData[index]?.date)}
                                    disabled={new Date(year, month - 1, date) < new Date(new Date().setDate(new Date().getDate() - 1))}
                                >
                                    {date}
                                </button>
                            ))}
                        </div>

                        {modalOpen && (
                            <div className="modal">
                            <div className="modal-content">
                                <div className="center-div-alg">
                                    <span className="close" onClick={handleModalClose}>&times;</span>
                                    <br />
                                    <h4>Update Availability Status</h4>
                                </div>
                                <br />
                                <div className="center-div-alg">
                                    <h6><span><b>Date: </b></span> {selectedDate}</h6>
                                </div>
                                <br />
                                <div className="center-div-alg">
                                    {holidayType === "mark" && (
                                    <button className="btn btn-custom btn-lg page-scroll holiday-btn" onClick={handleMarkAsHoliday}>
                                        Mark as Holiday
                                    </button>
                                    )}
                                    {holidayType === "cancel" && (
                                    <button className="btn btn-custom btn-lg page-scroll holiday-btn" onClick={handleCancelHoliday}>
                                        Cancel Holiday
                                    </button>
                                    )}
                                </div>
                               
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}

export default Timeslotcalendar;
