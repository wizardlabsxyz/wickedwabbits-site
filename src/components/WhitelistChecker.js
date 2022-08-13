import _ from 'lodash';
import React, { useState } from 'react'

import ErrorDialog from './ErrorDialog';

import mintPage from '../assets/bunnypage.jpg';

function WhitelistChecker() {

    const [value, setValue] = useState('');
    const [whitelistState, setWhitelistState] = useState(0);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);


    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <div>
            <ErrorDialog openDialog={openErrorDialog} setOpenDialog={setOpenErrorDialog} />

            <img src={mintPage} style={{ height: window.innerHeight, width: '100%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', top: '30%', right: '50%', transform: 'translate(50%, 50%)', gap: '10px' }}>
                <input
                    type='text'
                    onChange={handleChange}
                    value={value} />
                <button
                    style={{ width: '100%' }}
                    className='custom-btn'
                    onClick={async () => {
                        try {
                            setWhitelistState(0);
                            if (!_.isEmpty(value)) {
                                const response = await fetch('/.netlify/functions/checkWhitelist', {
                                    method: 'POST',
                                    body: JSON.stringify({ address: value })
                                }).then(response => response.json());
                                setWhitelistState(response.message ? 1 : 2);
                            }
                        } catch (e) {
                            console.log(e);
                            setOpenErrorDialog(true);
                        }
                    }}>Are you Wicked Enough?</button>
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