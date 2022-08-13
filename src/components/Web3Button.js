import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ethers } from "ethers";

import MetamaskErrorDialog from './MetamaskErrorDialog.js';
import NetworkErrorDialog from './NetworkErrorDialog.js';
import FailedMintDialog from './FailedMintDialog.js';
import ErrorDialog from './ErrorDialog.js';

export default function Web3Button() {

    const SUPPORTED_NETWORKS = ['goerli'];
    const CONTRACT_ADDRESS = '0x7ACA381ed24778faE753e83366bf37Df97e4f439';
    const ETHERSCAN_API_KEY = 'HHH6GJPM28725AMYYHR4FMYNTB9HXEW1MW';

    const [contractABI, setContractABI] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [signer, setSigner] = useState(undefined);
    const [signerAddress, setSignerAddress] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [isConnected, setConnected] = useState(false);
    const [isSaleLive, setIsSaleLive] = useState(false);
    const [networkSupported, setNetworkSupported] = useState(undefined);
    const [openMetamaskDialog, setOpenMetamaskDialog] = useState(false);
    const [openNetworkDialog, setOpenNetworkDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [mintCount, setMintCount] = useState(1);

    // Check for provider and set signer if available
    useEffect(() => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);

            const signer = provider.getSigner();
            signer.getAddress()
                .then((address) => {
                    setSigner(signer);
                    setSignerAddress(address);
                    setConnected(true);
                    console.log('connected - signer set - ' + address);
                }).catch((error) => {
                    console.log('signer is not connected: ' + error);
                });
        } catch (error) {
            console.log('provider not found: ' + error);
        }
    }, [accounts])

    // Check current network
    useEffect(() => {
        if (provider) {
            provider.getNetwork().then((network) => {
                if (!SUPPORTED_NETWORKS.includes(network.name)) {
                    console.log('detected unsupported network');
                    setNetworkSupported(false);
                    reset();
                } else {
                    setNetworkSupported(true);
                }
            });
        }
    }, [provider])

    useEffect(() => {
        if (window.ethereum) {

            async function listenMMAccount() {
                window.ethereum.on("accountsChanged", (accounts) => {
                    if (_.isNull(accounts) || _.isEmpty(accounts)) {
                        reset();
                    } else {
                        setAccounts(accounts);
                    }
                });
            }

            async function listenMMNetwork() {
                window.ethereum.on("chainChanged", () => {
                    console.log('chain changed');
                    window.location.reload();
                });
            }

            listenMMAccount();
            listenMMNetwork();
        }
    }, []);

    useEffect(() => {
        fetch(`https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
        ).then(res => res.json())
            .then(({ result }) => {
                if (result != null) {
                    setContractABI(result);
                } else {
                    console.error('Unable to resolve ABI');
                }
            });
    }, []);

    // Check sale state
    useEffect(() => {
        const getState = async () => {
            if (contractABI && provider) {
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

                const isPaused = await contract.paused();
                const isPresale = await contract.presale();
                const isPublicSale = await contract.publicSale();
                const state = JSON.stringify({ paused: isPaused, presale: isPresale, publicSale: isPublicSale });

                if (!isPaused && (isPresale || isPublicSale)) {
                    setIsSaleLive(true);
                    console.log('sale is live: ' + state);
                } else {
                    console.log('sale is not live: ' + state);
                }
            }
        }

        getState()
            .catch((error) => {
                console.log('Failed to get contract sale state: ' + error);
            });
    }, [contractABI, provider])

    async function connect() {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        setSigner(signer);
        setSignerAddress(signerAddress);
    }

    async function mint() {
        console.log('attempting mint for: ' + signerAddress);

        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

            const proof = await fetch('/.netlify/functions/getProof', {
                method: 'POST',
                body: JSON.stringify({ address: signerAddress })
            }).then(response => response.json());

            await contract.connect(signer).mint(
                mintCount,
                proof.proof,
                { value: ethers.utils.parseEther((mintCount * .01).toString()) },
            );
        } catch (error) {
            setOpenErrorDialog(true);
            setErrorMessage(error.error.message)
            throw error;
        }
    }

    function reset() {
        setSigner(undefined);
        setSignerAddress(undefined);
        setConnected(false);
        setAccounts(undefined);
    }

    function handleMintIncrease (e) {
        e.stopPropagation();
        if (mintCount < 4) {
            setMintCount(mintCount + 1)
        }
    }

    function handleMintDecrease (e) {
        e.stopPropagation();
        if (mintCount > 1) {
            setMintCount(mintCount - 1)
        }
    }


    return (
        <>
            <NetworkErrorDialog openDialog={openNetworkDialog} setOpenDialog={setOpenNetworkDialog} />
            <MetamaskErrorDialog openDialog={openMetamaskDialog} setOpenDialog={setOpenMetamaskDialog} />
            <ErrorDialog openDialog={openErrorDialog} setOpenDialog={setOpenErrorDialog} message={errorMessage} />

            {!isConnected &&
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <span className='rainbow' >6969 supply!</span>
                <button
                    className='custom-btn btn-3'
                    onTouchEnd={(e) => { e.stopPropagation() }}
                    onClick={(e) => {
                        e.stopPropagation();

                        if (!isSaleLive) {
                            setOpenErrorDialog(true);
                            setErrorMessage('Sale is not live yet');
                        } else {
                            if (!provider) {
                                setOpenMetamaskDialog(true);
                            } else if (!networkSupported) {
                                setOpenNetworkDialog(true);
                            } else {
                                connect()
                                    .then(() => {
                                        console.log('connected');
                                        setConnected(true);
                                    }).catch(() => {
                                        console.log('failed to connect');
                                    });
                            }
                        }
                }}>
                    <span>Connect</span>
                </button>
            </div>}
            {isConnected && 
            <div>
                <div className="qty mt-5 noselect">
                    <span className="minus bg-dark" onClick={(e) => handleMintDecrease(e)}>-</span>
                    <span type="number" readOnly className="count noselect" name="qty" >{mintCount}</span>
                    <span className="plus bg-dark" onClick={(e) => handleMintIncrease(e)}>+</span>
                </div>
                <button
                    className='custom-btn btn-3'
                    onTouchEnd={(e) => { e.stopPropagation() }}
                    onClick={(e) => {
                        e.stopPropagation();
                        mint()
                            .then(() => {
                                console.log('minted');
                            })
                            .catch((error) => {
                                console.log('failed to mint: ' + error);
                            });
                }}>
                    <span>Mint</span>
                </button>
            </div>

            }
        </>
    )
}