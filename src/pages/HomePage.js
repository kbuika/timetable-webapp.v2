import React from "react";
import Scheduler from "devextreme-react/scheduler";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

function getData(_, requestOptions) {
  const PUBLIC_KEY = "AIzaSyBxy0PL1Fom5inqmgTbFvwANrhsxFDCwOs",
    CALENDAR_ID = "7tf2trs0b98hjhp8mr9uqnlavo@group.calendar.google.com";
  const dataUrl = [
    "https://www.googleapis.com/calendar/v3/calendars/",
    CALENDAR_ID,
    "/events?key=",
    PUBLIC_KEY,
  ].join("");

  return fetch(dataUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => data.items);
}

const dataSource = new CustomStore({
  load: (options) => getData(options, { showDeleted: false }),
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
