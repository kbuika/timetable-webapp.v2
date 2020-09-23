import React, { Component } from "react";
// prebuild table component
import Scheduler from "devextreme-react/scheduler";
// data handler
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

// function to fetch the events from the calendar
function getLessons(_, requestOptions) {
  const PUBLIC_KEY = process.env.REACT_APP_GOOGLE_PUBLIC_KEY,
    CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;
  const lessonsUrl = [
    "https://www.googleapis.com/calendar/v3/calendars/",
    CALENDAR_ID,
    "/events?key=",
    PUBLIC_KEY,
  ].join("");

  return fetch(lessonsUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => data.items);
}

// data handler
const dataSource = new CustomStore({
  load: (options) => getLessons(options, { showDeleted: false }),
});

// scheduler preferences
const currentDate = new Date(2020, 8, 21);
const views = ["day", "workWeek"];

class App extends Component {
  render() {
    return (
      <>
        <div className="title">
          <h3>
            <u>3N TimeTable</u>
          </h3>
        </div>
        <Scheduler
          dataSource={dataSource}
          views={views}
          defaultCurrentView="workWeek"
          defaultCurrentDate={currentDate}
          height={500}
          startDayHour={7}
          endDayHour={16}
          editing={false}
          showAllDayPanel={false}
          startDateExpr="start.dateTime"
          endDateExpr="end.dateTime"
          textExpr="summary"
          timeZone="Africa/Nairobi"
        />
      </>
    );
  }
}

export default App;
