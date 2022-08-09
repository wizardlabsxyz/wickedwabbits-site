import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Loader({ doneCallback, style }) {

    const lottieAnimateControls = useAnimation();

    const [lottieRef, setLottieRef] = useState(undefined);
    const [lottieLoopCounter, setLottieLoopCounter] = useState(0);

    useEffect(() => {
        if (lottieLoopCounter == 1) {
            lottieRef.lottie.stop();
            lottieAnimateControls.start({
                opacity: 0,
                transition: { duration: 1 }
            }).then(() =>{
                lottieAnimateControls.start({
                    display: 'none'
                }).then(() => {
                    doneCallback();
                });
            });
        }
    }, [lottieLoopCounter]);

    return (
        <motion.div
            style={{...style, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            animate={lottieAnimateControls}>
            <Player
                style={{ height: style.height, width: style.width }}
                lottieRef={instance => {
                    setLottieRef({ lottie: instance });
                }}
                onEvent={event => {
                    if (event === 'loop') {
                        setLottieLoopCounter(lottieLoopCounter + 1);
                    }
                }}
                loop
                autoplay
                src='https://assets1.lottiefiles.com/packages/lf20_jbtaguq2.json'/>
        </motion.div>
    )
}
