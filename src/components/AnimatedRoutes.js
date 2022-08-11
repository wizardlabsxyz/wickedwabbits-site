import React from 'react'
import {
    Route,
    Routes
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"

import Home from './Home.js';
import WhitelistChecker from './WhitelistChecker.js';

function AnimatedRoutes() {

    return (
        <AnimatePresence>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='wickedlist' element={<WhitelistChecker />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes