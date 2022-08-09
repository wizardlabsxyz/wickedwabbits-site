import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

export default function TwitterLottie({ style }) {

    return (
        <a style={style} href='https://twitter.com/eth_wizard' target='_blank'>
            <motion.div
                className='rabbit-cursor'
                style={{...style, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Player
                    loop
                    autoplay
                    src='https://assets10.lottiefiles.com/packages/lf20_lq4Zb5.json'/>
            </motion.div>
        </a>

    )
}
