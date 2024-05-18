import React, { useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './dashboard.css';
import './utils.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

const Report = () => {
    const [selectedMonth, setSelectedMonth] = useState('05');
    const [selectedYear, setSelectedYear] = useState('2024');
    const [pdfUrl, setPdfUrl] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [message, setMessage] = useState('');

    const fetchReport = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/get-report?month=${selectedMonth}&year=${selectedYear}`);
            console.log("response.data.data: ", response.data.data);
            if (response.data.data && response.data.data.pdf_url) {
                setPdfUrl(response.data.data.pdf_url);
                setMessage('');
            } else {
                setPdfUrl('');
                setMessage('No report available for the selected month and year.');
            }
        } catch (error) {
            console.error('Error fetching the report:', error);
            setPdfUrl('');
            setMessage('Error fetching the report.');
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Monthly Report</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Monthly Report</li>
                        </ol>
                    </nav>
                </div>
                <section className="section ">
                    <div className="center-align-div report-flex-div">
                        <div className="dash-input-box">
                            <label>
                                Month:
                                <select className=" small-font" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                    {months.map((month) => (
                                        <option key={month.value} value={month.value}>
                                            {month.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Year:
                                <select className=" small-font" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    
                        <div className="center-align-div">
                            <button onClick={fetchReport} className="btn btn-custom btn-lg page-scroll small-font">Get Report</button>
                        </div>
                    </div>
                    {pdfUrl ? (
                        <div className="right-align-div">
                            <a href={pdfUrl} download="monthly_report.pdf" className="btn btn-primary mt-3">
                                Download PDF
                            </a>
                            <div className="pdf-doc-div">
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<div>Loading PDF...</div>}
                                error={<div>Failed to load PDF</div>}
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                ))}
                            </Document>
                            </div>
                        </div>
                    ) : (
                        <p>{message}</p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Report;
