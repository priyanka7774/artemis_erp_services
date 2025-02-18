import React, { useState, useEffect } from "react";
import Weekly from "./Weekly"; 

const Dashboard = () => {
  const [userName, setUserName] = useState(""); 
  const [isLoading, setIsLoading] = useState(true); 
  const [view, setView] = useState("dashboard"); 

  // Fetch the user's name from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // Get the name from localStorage
    if (storedUserName) {
      setUserName(storedUserName); 
      setIsLoading(false); 
    } else {
      setIsLoading(false); 
    }
  }, []);

  // Affirmation messages
  const affirmations = [
    "You're doing great!",
    "Keep up the good work!",
    "Success is on the way!",
    "Believe in yourself!",
    "You're amazing!",
  ];

  // Randomly select an affirmation
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  // Handle the button clicks to switch views
  const handleButtonClick = (viewName) => {
    setView(viewName); // Set the view based on the clicked button
  };

  return (
    <div className="container mt-4">
      {/* Welcome Section */}
      <div id="welcome-section" className="mb-4">
        {isLoading ? (
          <p>Loading...</p> // Show loading message while fetching data
        ) : (
          <>
            <h2 className="text-dark">Welcome, {userName || "Guest"}!</h2>
            <p className="text-muted">{randomAffirmation}</p>
          </>
        )}
      </div>

      {/* Buttons to switch between Weekly, Monthly, and Yearly */}
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => handleButtonClick("weekly")}>Weekly</button>
        <button className="btn btn-primary me-2" onClick={() => handleButtonClick("monthly")}>Monthly</button>
        <button className="btn btn-primary" onClick={() => handleButtonClick("yearly")}>Yearly</button>
      </div>

      {/* Conditional Rendering based on selected view */}
      <div>
        {view === "weekly" && <Weekly />}
        {/* {view === "monthly" && <Monthly />} Uncomment this line if you have a Monthly component */}
        {/* {view === "yearly" && <Yearly />} Uncomment this line if you have a Yearly component */}
      </div>

      {/* Task Report Section (only visible on Dashboard view) */}
      {view === "dashboard" && (
        <div className="mt-4">
          <h3 className="text-dark mb-3">Task Report</h3>
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th className="bg-primary text-dark fw-bold">Time</th>
                <th className="bg-primary text-dark fw-bold">Scheduled</th>
                <th className="bg-primary text-dark fw-bold">Actually Done</th>
                <th className="bg-primary text-dark fw-bold"> Waiting</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                let times = [];
                let currentTime = new Date();
                currentTime.setHours(9, 0, 0, 0); 

                while (currentTime.getHours() < 18) {
                  times.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                  currentTime.setMinutes(currentTime.getMinutes() + 30);
                }

                return times.map((time, index) => (
                  <tr key={index}>
                    <td>{time}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
