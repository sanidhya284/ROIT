// src/services/web3.js
import Web3 from 'web3';

// Check if Web3 is injected (e.g., by MetaMask)
const web3 = window.ethereum ? new Web3(window.ethereum) : new Web3('http://localhost:8545');

export default web3;
