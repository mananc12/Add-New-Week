import React, { useState, useEffect } from "react";
import axios from "axios";

const List = (props) => {
  // State to store the list of weeks fetched from the API
  const [details, setDetails] = useState([]);

  // State to keep track of the index of the active button, -1 means no active button
  const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

  const url = "http://localhost:5000";

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the backend API
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setDetails(response.data.weeks);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle click event for the buttons
  const handleClick = (val, index) => {
    // Create a string representing the week to send to the parent component
    const weekToSend = `Week ${val}`;
    // Convert week number to a number (if it's received as a string)
    const weekNumber = Number(val);

    // Find the details of the clicked week
    const detailsToSend = details.find(
      (week) => week.week_number === weekNumber
    );

    // Check if the clicked button is already active, if not, update the activeButtonIndex state
    if (activeButtonIndex !== index) {
      setActiveButtonIndex(index);
    }

    // Send the week and its details to the parent component via props
    props.weekToReceive(weekToSend);
    props.detailsToReceive(detailsToSend);
  };

  // JSX for rendering the list of weeks with buttons
  return (
    <ul className="weeks-list">
      {details.map((week, index) => {
        return (
          <li key={index} className="week-num">
            {/* Button representing each week */}
            <button
              className={
                activeButtonIndex === index
                  ? "colorOnClick"
                  : "colorOnNotClick"
              }
              onClick={() => handleClick(week.week_number, index)} // Pass the index to handleClick
            >
              <p> Week {week.week_number}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
