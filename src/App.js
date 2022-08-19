import React from "react";
import { BrowserRouter } from "react-router-dom";

import './css/App.css';
import './css/Mobile.css';

import AnimatedRoutes from "./components/AnimatedRoutes.js";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AnimatedRoutes />
            </BrowserRouter>
        </div>
    );
}