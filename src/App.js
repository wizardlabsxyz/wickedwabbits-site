import React from "react";
import { HashRouter as Router } from "react-router-dom";

import './css/App.css';
import AnimatedRoutes from "./components/AnimatedRoutes.js";

export default function App() {
  return (
    <div className="App">
        <Router>
            <AnimatedRoutes/>
        </Router>
    </div>
  );
}