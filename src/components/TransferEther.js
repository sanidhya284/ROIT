// src/components/TransferEther.js
import React, { useState } from 'react';
import postContract from '../utils/postContract';
import web3 from '../utils/web3';

const TransferEther = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await postContract.methods.transferEther(recipient, web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
      console.log('Transfer successful');
    } catch (error) {
      console.error('Error transferring Ether:', error);
    }
  };

  return (
    <form onSubmit={handleTransfer}>
      <div>
        <label>Recipient Address:</label>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
      </div>
      <div>
        <label>Amount (ETH):</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferEther;