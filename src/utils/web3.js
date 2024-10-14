// src/utils/web3.js
import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
      console.log('Connected accounts:', accounts);
    })
    .catch(error => {
      if (error.code === 4001) {
        console.error('User rejected the request.');
      } else {
        console.error('Error requesting accounts:', error);
      }
    });
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default web3;