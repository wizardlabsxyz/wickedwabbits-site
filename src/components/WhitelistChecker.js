import React from 'react'

function WhitelistChecker() {

    return (
        <button onClick={async () => {
            const response = await fetch('/.netlify/functions/checkWhitelist')
            .then(
                response => response.json()
            )

            console.log(JSON.stringify(response));
        }}>Click me</button>
    )
}

export default WhitelistChecker