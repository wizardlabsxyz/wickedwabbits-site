import React from 'react'

function WhitelistChecker() {

    return (
        <button onClick={async () => {

            const response = await fetch('/.netlify/functions/checkWhitelist', {
                method: 'POST',
                body: JSON.stringify({ address: '0x0AcFE2ED7e0da4e36dd582840Db65bE341FacC2a' })
            }).then(response => response.json());

            console.log(JSON.stringify(response));
        }}>Click me</button>
    )
}

export default WhitelistChecker