import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EventDetails from "./components/EventDetails";
import ShortlistedEvents from "./components/ShortlistedEvents";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/shortlist" element={<ShortlistedEvents />} />
      </Routes>
    </Router>
  );
};

export default App;
