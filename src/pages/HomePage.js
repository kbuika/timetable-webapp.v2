import React from "react";
import Scheduler from "devextreme-react/scheduler";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

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

const dataSource = new CustomStore({
  load: (options) => getLessons(options, { showDeleted: false }),
});

const currentDate = new Date(2020, 8, 21);
const views = ["day", "workWeek"];

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="long-title">
          <h3>3N TimeTable</h3>
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
      </React.Fragment>
    );
  }
}

export default App;
