import _ from 'lodash';
import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';


import ErrorDialog from './ErrorDialog';
import WhitelistCheckerButton from './WhitelistCheckerButton';

import mintPage from '../assets/bunnypage.jpg';
import mintPageMobile from '../assets/bunnypage-mobile.jpg';

function WhitelistChecker() {

    const [whitelistState, setWhitelistState] = useState(0);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    let message;

    switch (whitelistState) {
        case 1:
            message = 'Welcome to the Wicked List'
            break;
        case 2:
            message = 'Not on the Wicked List… Try your luck in public mint'
            break;
        default:
            message = 'Are you \r\n Wicked Enough?'
    }

    return (
        <div>
            <ErrorDialog openDialog={openErrorDialog} setOpenDialog={setOpenErrorDialog} />

            <BrowserView>
                <img src={mintPage} style={{ height: window.innerHeight, width: '100%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '30%', right: '50%', transform: 'translate(50%, 10%)', gap: '10px' }}>
                    <span
                        className='noselect wickedlist-message'>
                        {message}
                    </span>

                    <WhitelistCheckerButton
                        statusHandler={async (status) => {
                            setWhitelistState(0);
                            await new Promise(resolve => setTimeout(resolve, 500));
                            setWhitelistState(status ? 1 : 2);
                        }} />
                </div>
            </BrowserView>
            <MobileView>
                <img src={mintPageMobile} style={{ height: window.innerHeight, width: '100%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '30%', right: '50%', transform: 'translate(50%, 10%)', gap: '10px' }}>
                    <span
                        className='noselect wickedlist-message'>
                        {message}
                    </span>

                    <WhitelistCheckerButton
                        statusHandler={async (status) => {
                            setWhitelistState(0);
                            await new Promise(resolve => setTimeout(resolve, 500));
                            setWhitelistState(status ? 1 : 2);
                        }} />
                </div>
            </MobileView>



        </div >

    )
}

export default WhitelistChecker