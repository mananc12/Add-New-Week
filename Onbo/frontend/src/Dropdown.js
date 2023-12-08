import React, { useState, useEffect } from "react";
import axios from "axios";

const Dropdown = () => {
  // API URLs
  const url = "http://localhost:5000/api/weeks";
  const url_backend = "http://localhost:5000";

  // State for storing data and dropdown selections
  const [details, setDetails] = useState([]); // List of weeks fetched from the API
  const [newWeek, setNewWeek] = useState([]); // Array of week names in the format "Week {week_number}"
  const [dropdownData, setDropdownData] = useState({
    show1: false, // Toggle for displaying/hiding order dropdown options
    show2: false, // Toggle for displaying/hiding week dropdown options
    textOrderWeek: { order: "order", week: "week" }, // Selected order and week in the dropdown
  });

  // Fetch data from the backend API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch weeks data from the backend API
  const fetchData = async () => {
    try {
      const response = await axios.get(url_backend);
      setDetails(response.data.weeks);
    } catch (error) {
      console.error(error);
    }
  };

  // Update the newWeek array when details change
  useEffect(() => {
    setNewWeek(details.map((week) => `Week ${week.week_number}`));
  }, [details]);

  // Get the index of the selected week in the newWeek array
  const weekIndex = newWeek.indexOf(dropdownData.textOrderWeek.week);

  // Handle click events for order and week selection
  const handleClick = (val) => {
    if (val === "a") {
      setDropdownData((prevState) => ({
        ...prevState,
        show1:!dropdownData.show1,
        textOrderWeek: { ...prevState.textOrderWeek, order: "After" },
      }));
    } else if (val === "b") {
      setDropdownData((prevState) => ({
        ...prevState,
        show1:!dropdownData.show1,
        textOrderWeek: { ...prevState.textOrderWeek, order: "Before" },
      }));
    } else if (val >= 1 && val <= 12) {
      setDropdownData((prevState) => ({
        ...prevState,
        show2:!dropdownData.show2,
        textOrderWeek: { ...prevState.textOrderWeek, week: newWeek[val - 1] },
      }));
    } else {
      // Reset the order and week selection when "cancel" is clicked
      setDropdownData((prevState) => ({
        ...prevState,
        textOrderWeek: { order: "order", week: "week" },
      }));
    }
  };

  // Toggle display of order dropdown options
  const handleToggleShow1 = () => {
    setDropdownData((prevState) => ({ ...prevState, show1: !prevState.show1 }));
  };

  // Toggle display of week dropdown options
  const handleToggleShow2 = () => {
    setDropdownData((prevState) => ({ ...prevState, show2: !prevState.show2 }));
  };

  // Handle the "Create" button click
  const handleCreate = async () => {
    const beforeAddedWeek = {
      id: details.length + 1, // Generate a new ID for the week
      week_number: weekIndex, // Set week_number based on user selection
      modules: [], // Since this is a new week, there are no modules initially
    };
    const afterAddedWeek = {
      id: details.length + 1, // Generate a new ID for the week
      week_number: weekIndex + 1, // Set week_number based on user selection
      modules: [], // Since this is a new week, there are no modules initially
    };
    // Create a copy of the existing details array
    const updatedDetails = [...details];

    // Update the details array based on the selected order (Before/After)
    if (dropdownData.textOrderWeek.order === "Before") {
      updatedDetails.splice(weekIndex, 0, beforeAddedWeek);
      const nameWeeksBeforeWeekAdded = updatedDetails.map((week, index) =>
        index >= weekIndex ? { ...week, week_number: index + 1 } : week
      );
      setDetails(nameWeeksBeforeWeekAdded);
      try {
        await axios.post(url, { nameWeeksBeforeWeekAdded });
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    } else if (dropdownData.textOrderWeek.order === "After") {
      updatedDetails.splice(weekIndex + 1, 0, afterAddedWeek);
      const nameWeeksAfterWeekAdded = updatedDetails.map((week, index) =>
        index > weekIndex ? { ...week, week_number: index + 1 } : week
      );
      setDetails(nameWeeksAfterWeekAdded);
      try {
        await axios.post(url, { nameWeeksAfterWeekAdded });
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }

    // Reset the dropdown selection after creating the new week
    setDropdownData((prevState) => ({
      ...prevState,
      textOrderWeek: { order: "order", week: "week" },
    }));

    window.location.reload();
  };

  // JSX for the Dropdown component
  return (
    <div className="main-dropdown">
      <div className="add-new-week-in-dropped">
        <p>ADD NEW WEEK</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M16.25 13.125H14.375V11.25H13.125V13.125H11.25V14.375H13.125V16.25H14.375V14.375H16.25V13.125Z"
            fill="#F24E1E"
          />
          <path
            d="M13.75 18.75C11 18.75 8.75 16.5 8.75 13.75C8.75 11 11 8.75 13.75 8.75C16.5 8.75 18.75 11 18.75 13.75C18.75 16.5 16.5 18.75 13.75 18.75ZM13.75 10C11.6875 10 10 11.6875 10 13.75C10 15.8125 11.6875 17.5 13.75 17.5C15.8125 17.5 17.5 15.8125 17.5 13.75C17.5 11.6875 15.8125 10 13.75 10Z"
            fill="#F24E1E"
          />
          <path
            d="M17.5 3.75C17.5 3.0625 16.9375 2.5 16.25 2.5H13.75V1.25H12.5V2.5H7.5V1.25H6.25V2.5H3.75C3.0625 2.5 2.5 3.0625 2.5 3.75V16.25C2.5 16.9375 3.0625 17.5 3.75 17.5H7.5V16.25H3.75V3.75H6.25V5H7.5V3.75H12.5V5H13.75V3.75H16.25V7.5H17.5V3.75Z"
            fill="#F24E1E"
          />
        </svg>
      </div>
      <hr className="hr1" />
      {/* <div className="big-dropDown-container"> */}
      <div className="dropDown-container">
        <div className="order-container">
          <div className="text-drop-icon" onClick={handleToggleShow1}>
            <p> Order </p>
            {/* <ArrowDropDownIcon /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M6.00058 8.5C5.87294 8.49936 5.74704 8.47031 5.63201 8.41496C5.51699 8.35961 5.41573 8.27935 5.33558 8.18L3.23058 5.63C3.10758 5.47648 3.03018 5.2915 3.00719 5.09613C2.98421 4.90077 3.01657 4.70287 3.10058 4.525C3.16872 4.37041 3.27992 4.23871 3.42089 4.14561C3.56187 4.05252 3.72666 4.00197 3.89558 4H8.10558C8.27451 4.00197 8.4393 4.05252 8.58028 4.14561C8.72125 4.23871 8.83244 4.37041 8.90058 4.525C8.9846 4.70287 9.01696 4.90077 8.99398 5.09613C8.97099 5.2915 8.89359 5.47648 8.77058 5.63L6.66558 8.18C6.58544 8.27935 6.48418 8.35961 6.36915 8.41496C6.25413 8.47031 6.12823 8.49936 6.00058 8.5Z"
                fill="#303030"
              />
            </svg>
          </div>
          <div className={dropdownData.show1 ? "dropdown-orders" : "active"}>
            <div className="droplist-div" onClick={() => handleClick("b")}>
              <p>Before</p>
            </div>
            <div className="droplist-div" onClick={() => handleClick("a")}>
              <p>After</p>
            </div>
          </div>
        </div>
        <div className="Week-container">
          <div className="text-drop-icon" onClick={handleToggleShow2}>
            <p> Week </p>
            {/* <ArrowDropDownIcon /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M5.99961 8.5C5.87196 8.49936 5.74606 8.47031 5.63104 8.41496C5.51602 8.35961 5.41476 8.27935 5.33461 8.18L3.22961 5.63C3.1066 5.47648 3.0292 5.2915 3.00622 5.09613C2.98323 4.90077 3.01559 4.70287 3.09961 4.525C3.16775 4.37041 3.27894 4.23871 3.41992 4.14561C3.56089 4.05252 3.72568 4.00197 3.89461 4H8.10461C8.27353 4.00197 8.43833 4.05252 8.5793 4.14561C8.72027 4.23871 8.83147 4.37041 8.89961 4.525C8.98362 4.70287 9.01598 4.90077 8.993 5.09613C8.97002 5.2915 8.89261 5.47648 8.76961 5.63L6.66461 8.18C6.58446 8.27935 6.4832 8.35961 6.36818 8.41496C6.25315 8.47031 6.12725 8.49936 5.99961 8.5Z"
                fill="#303030"
              />
            </svg>
          </div>
          <div className={dropdownData.show2 ? "dropdown-weeks" : "active"}>
            {newWeek.map((week, index) => (
              <div
                className="droplist-div"
                key={index}
                onClick={() => handleClick(index + 1)}
              >
                <p>{week}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="order-week-text">
        <p>
          New week will be added{" "}
          <span className="order-week">
            "{dropdownData.textOrderWeek.order}"
          </span>{" "}
          "
          <span className="order-week">{dropdownData.textOrderWeek.week}"</span>
        </p>
      </div>
      <hr className="hr2" />
      <div className="buttons">
        <button className="btn1" onClick={() => handleClick("cancel")}>
          <p>Cancel</p>
        </button>
        <button type="submit" className="btn2" onClick={handleCreate}>
          <p> Create</p>
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dropdown;
