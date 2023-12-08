import React, { useState } from "react";
import List from "./List";
import Dropdown from "./Dropdown";

function App() {
  // State to store the selected week name
  const [weekName, setWeekName] = useState("");

  // State to store the details of the selected week
  const [details, setDetails] = useState([]);

  // State to toggle the visibility of the dropdown component
  const [dropDown, setDropDown] = useState(false);

  // Function to handle receiving the week name from the List component
  const handleWeekReceived = (value) => {
    setWeekName(value);
  };

  // Function to handle receiving the week details from the List component
  const handleDetailsReceived = (value) => {
    setDetails(value);
  };

  // Function to handle the click event for the "Add new week" button
  const handleClick = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="App">
      <div className="allWeek-addToWeek-container">
        <div className="second-top-container">
          {/* Render the List component */}
          <List
            weekToReceive={handleWeekReceived}
            detailsToReceive={handleDetailsReceived}
          />
          <button className="icon-text" onClick={handleClick}>
            {/* SVG Image representing the "Add new week" button */}
            <img
              src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M13 10.5H11.5V9H10.5V10.5H9V11.5H10.5V13H11.5V11.5H13V10.5Z' fill='%233B4C6D'/%3E%3Cpath d='M11 15C8.8 15 7 13.2 7 11C7 8.8 8.8 7 11 7C13.2 7 15 8.8 15 11C15 13.2 13.2 15 11 15ZM11 8C9.35 8 8 9.35 8 11C8 12.65 9.35 14 11 14C12.65 14 14 12.65 14 11C14 9.35 12.65 8 11 8Z' fill='%233B4C6D'/%3E%3Cpath d='M14 3C14 2.45 13.55 2 13 2H11V1H10V2H6V1H5V2H3C2.45 2 2 2.45 2 3V13C2 13.55 2.45 14 3 14H6V13H3V3H5V4H6V3H10V4H11V3H13V6H14V3Z' fill='%233B4C6D'/%3E%3C/svg%3E"
              alt="SVG Image"
              className="add-new-week-icon"
            />

            <p>Add new week</p>
          </button>
        </div>
        {/* Render the Dropdown component */}
        <div className={dropDown ? "drop-down" : "active"}>
          <Dropdown />
        </div>
      </div>
      <div className="container">
        <div className="week">
          {/* Display the selected week name */}
          <p>{weekName}</p>
        </div>
        <div className="details">
          {/* Display the modules and tasks of the selected week */}
          {details &&
            details.modules &&
            details.modules.map((module) => (
              <div className="question-container" key={module.id}>
                <ul>
                  <li key={module.id}>
                    <strong className="question">{module.name}</strong>
                    {module.tasks && (
                      <ul>
                        {module.tasks.map((task) => (
                          <li className="sub-question" key={task.id}>{task.name}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
