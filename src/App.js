import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/3n-timetable" component={HomePage} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
