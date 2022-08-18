import _ from 'lodash';
import React, { useState } from 'react'

import ErrorDialog from './ErrorDialog';
import WhitelistCheckerButton from './WhitelistCheckerButton';

import mintPage from '../assets/bunnypage.jpg';

function WhitelistChecker() {

    const [whitelistState, setWhitelistState] = useState(0);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);

    return (
        <div>
            <ErrorDialog openDialog={openErrorDialog} setOpenDialog={setOpenErrorDialog} />

            <img src={mintPage} style={{ height: window.innerHeight, width: '100%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '30%', right: '50%', transform: 'translate(50%, 50%)', gap: '10px' }}>
            <WhitelistCheckerButton statusHandler={async (status)=> {
                console.log(status)
                setWhitelistState(0);
                await new Promise(resolve => setTimeout(resolve, 500));
                setWhitelistState(status ? 1 : 2)
            }}/>

            </div>
            {whitelistState === 1 && <span
                className='noselect'
                style={{
                    fontFamily: 'Amatic SC', fontWeight: 700, fontSize: '10vh', 
                    position: 'absolute', transform: 'translate(50%, 50%)', right: '50%', top: '10%',
                    color: 'white'}}>
                Welcome to the Wicked List
            </span>}
            {whitelistState === 2 && <span
                className='noselect'
                style={{
                    fontFamily: 'Amatic SC', fontWeight: 700, fontSize: '10vh', 
                    position: 'absolute', transform: 'translate(50%, 50%)', right: '50%', top: '10%',
                    color: 'white'}}>
                Sorry Friend
            </span>}
        </div>

    )
}

export default WhitelistChecker