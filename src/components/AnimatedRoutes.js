import React from 'react'
import {
    Route,
    Routes,
    useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"

import Home from './Home.js';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location}>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes