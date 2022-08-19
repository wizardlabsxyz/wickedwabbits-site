import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion';
import { BrowserView, MobileView } from 'react-device-detect';

import Loader from './Loader.js'
import Card from './Card.js'
import TwitterLottie from './TwitterLottie.js';

import bgMobile from '../assets/bgMobile.jpg';
import mintPage from '../assets/bunnypage.jpg';
import mintPageMobile from '../assets/bunnypage-mobile.jpg';
import video from '../assets/video.mp4';

export default function Home() {

    const spanControls = useAnimation();
    const mintPageControls = useAnimation();
    const landingPageControls = useAnimation();

    const [videoRef, setVideoRef] = useState(undefined);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [readyForMintPage, setReadyForMintPage] = useState(false);
    const [allowFlip, setAllowFlip] = useState(false);
    const [clickOverride, setClickOverride] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const video = document.getElementById('video'); 
        setVideoRef(video);

        if(video && !clickOverride) {
            video.onended = () => {
                mintPageControls.start({
                    y: -window.innerHeight,
                    transition: { duration: 1 },
                }).then(() => {
                    setAllowFlip(true);
                });
            }
        }
    }, []);

    return (
        <div>
            <BrowserView style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Loader 
                    style={{ position: 'absolute', height: '50vh', width: '50vw' }}
                    doneCallback={() => {
                        setIsLoading(false);
                        landingPageControls.start({
                            opacity: 1,
                            transition: { duration: 1 }
                        });
                }}/>

                {/* Landing Page */}
                <motion.div 
                    animate={landingPageControls}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0 }} 
                    onClick={() => {
                        if (!isLoading) {
                            if (!videoPlaying) {
                                spanControls.start({
                                    opacity: 0,
                                    transition: { duration: 1 }
                                }).then(() => {
                                    spanControls.start({
                                        display: 'none'
                                    });
                                    videoRef.play();
                                    setVideoPlaying(true);
                                });
                            } else {
                                if (!clickOverride) {
                                    mintPageControls.start({
                                        y: -window.innerHeight,
                                        transition: { duration: 1 },
                                    }).then(() => {
                                        setAllowFlip(true);
                                    });
                                    setClickOverride(true);
                                }
                            }
                        }
                }}>
                    <video id={'video'} style={{width: '100vw', height: '100vh', objectFit: 'fill'}} muted>
                        <source src={video} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <motion.span
                        className='rabbit-cursor wiggle' 
                        animate={spanControls}
                        style={{fontFamily: 'Amatic SC', fontWeight: 700, fontSize: '50px', position: 'absolute', marginTop: '-25vh'}}>
                        How Deep Does The Rabbit Hole Go?
                    </motion.span>
                </motion.div>

                {/* Mint Page */}
                <motion.div
                    style={{ position: 'absolute', width: '100%', height: '100%', top: window.innerHeight}}
                    animate={mintPageControls}>
                    <span
                        className='noselect'
                        style={{
                            fontFamily: 'Amatic SC', fontWeight: 700, fontSize: '10vh', 
                            position: 'absolute', transform: 'translate(50%, 0)', right: '50%',
                            color: 'white'}}>
                        Wicked Wabbits
                    </span>
                    <Card allowFlip={allowFlip} style={{ 
                        position: 'absolute', height: '75vh', width: '25vw', 
                        top: '50%', transform: 'translate(50%, -50%)', right: '50%'
                    }}/>
                    <TwitterLottie style={{position: 'absolute', height: '3vh', width: '3vw', top: '95%', transform: 'translate(50%, -95%)', right: '50%'}}/>
                    <img src={mintPage} style={{ height: window.innerHeight, width: '100%'}}/>
                </motion.div>

            </BrowserView>    
            <MobileView style={{ height: window.innerHeight, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                onTouchStart={() => {
                    if(readyForMintPage) {
                        mintPageControls.start({
                            opacity: 1,
                            transition: { duration: 1 }
                        }).then(() => {
                            setAllowFlip(true);
                        });
                    }
                }}>

                <Loader
                    style={{ position: 'absolute' }}
                    doneCallback={() => {
                        landingPageControls.start({
                            opacity: 1,
                            transition: { duration: .5 }
                        }).then(() => {
                            setReadyForMintPage(true);
                        });
                }}/>

                <motion.div 
                    style={{ opacity: 0 }} 
                    animate={landingPageControls}>
                    <motion.img src={bgMobile} style={{ width: '100%', height: window.innerHeight}}/>
                    {/* <div 
                    style={{ position: 'absolute', transform: 'translate(50%, -50%)', right: '50%', top: '50%' }}> */}
                        <span
                            className='wiggle-no-hover'
                            style={{fontFamily: 'Amatic SC', fontWeight: 700, fontSize: '5vh', width: '100%', position: 'absolute', right: '0', top: '5%'}}>
                            How Deep Does The Rabbit Hole Go?
                        </span>
                    {/* </div> */}
                </motion.div>

                {/* Mint Page */}
                <motion.div
                    id={'mintPage'}
                    style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0}}
                    animate={mintPageControls}>
                    <span
                        className='noselect'
                        style={{
                            fontFamily: 'Amatic SC', fontWeight: 700, fontSize: '8vh', width: '100%',
                            position: 'absolute', transform: 'translate(50%, -45%)', right: '50%',
                            top: '5%', 
                            color: 'white'}}>
                        Wicked Wabbits
                    </span>
                    <Card allowFlip={allowFlip} style={{ 
                        position: 'absolute', height: '80%', width: '90%',
                        top: '50%', transform: 'translate(50%, -50%)', right: '50%'
                    }}/>
                    <TwitterLottie style={{position: 'absolute', height: '15vh', width: '15vw', top: '100%', transform: 'translate(50%, -90%)', right: '50%'}}/>
                    <img src={mintPageMobile} style={{ width: '100%', height: window.innerHeight}}/>
                </motion.div>
            </MobileView>    
        </div>
    );
}