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
                <span style={{ color: 'black', width: '100%', fontSize: '5vh'  }}>Flip the card to see</span>
                <br></br>
                <span style={{ color: 'black', width: '100%', fontSize: '5vh'  }}>One is on you</span>
                <br></br>
                <span style={{ color: 'black', width: '100%', fontSize: '5vh'  }}>The other is free</span>
                <br></br>
                <span style={{ color: 'black', width: '100%', fontSize: '5vh'  }}>Flip if you must</span>
                <br></br>
                <span style={{ color: 'black', width: '100%', fontSize: '5vh'  }}>HODL if you trust</span>
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
                <span style={{ color: 'black', fontSize: '4vh'}}>0.01 eth + gas per wallet</span>
                <span style={{ color: 'black', fontSize: '2.5vh'}}>1 free mint with every transaction</span>
                <br></br>
                <span style={{ color: 'black', fontSize: '4vh'}}>Nothing but Community</span>       
                <span style={{ color: 'black', fontSize: '4vh' }}>No roadmap</span>
                <span style={{ color: 'black', fontSize: '4vh' }}>No discord</span>        
                <span style={{ color: 'black', fontSize: '4vh' }}>No utility</span>   
                <br></br>
                <span className='rainbow' >6969 supply!</span>
                <Web3Button />
            </motion.div>
        </div>
    )
}
