import React from 'react';
import { motion, useAnimation } from 'framer-motion';

import Web3Button from './Web3Button.js'

import frame from '../assets/frame.png';

export default function Card({ style, allowFlip }) {

    const cardFrontControls = useAnimation();
    const cardBackControls = useAnimation();

    return (
        <div
            style={style}>
            <motion.div
                onClick={() => {
                    if(allowFlip) {
                        cardBackControls.start({
                            rotateY: 90,
                            transition: { duration: 1 }
                        }).then(() => {
                            cardBackControls.start({
                                display: 'none'
                            });
                            cardFrontControls.start({
                                rotateY: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: { duration: 1 }
                            });
                        });
                    }
                }}
                animate={cardBackControls}
                className='rabbit-cursor'
                style={{
                    backgroundImage: `url(${frame})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: '25px'
                }}>
                <span className='text-large'>Flip the card to see</span>
                <br></br>
                <span className='text-large'>One is on you</span>
                <br></br>
                <span className='text-large'>The other is free</span>
                <br></br>
                <span className='text-large'>Flip if you must</span>
                <br></br>
                <span className='text-large'>HODL if you trust</span>
            </motion.div>
            <motion.div
                onClick={() => {
                    if(allowFlip) {
                        cardFrontControls.start({
                            rotateY: 90,
                            transition: { duration: 1 }
                        }).then(() => {
                            cardFrontControls.start({
                                display: 'none'
                            });
                            cardBackControls.start({
                                rotateY: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: { duration: 1 }
                            });
                        });;
                    }
                }}
                animate={cardFrontControls}
                className='rabbit-cursor'
                style={{
                    backgroundImage: `url(${frame})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    display: 'none', rotateY: 90, width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: '25px'
                }}>
                <span className='text'>1 FREE MINT PER TRANSACTION</span>
                <span className='text'>0.01 eth + gas per wallet</span>
                <br></br>
                <span className='text'>Nothing but Community</span>       
                <span className='text'>No roadmap</span>
                <span className='text'>No discord</span>        
                <br></br>
                <Web3Button />
            </motion.div>
        </div>
    )
}
