// Import required modules
const express = require('express');
const app = express();
const {Web3} = require('web3');
const path = require('path');
const { create } = require('ipfs-http-client');

// Initialize IPFS client
const ipfs = create({ url: 'http://localhost:5001' }); 

// Initialize Web3 and connect to local Ethereum node (Ganache)
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Import the smart contract ABI and contract address
const contractABI = require('../build/contracts/SocialMedia.json').abi;
const contractAddress = "0x9b311b1a5c861133d2eAf967C4c5Bf4903706c40"; // Replace with your actual contract address after deployment
const socialMediaContract = new web3.eth.Contract(contractABI, contractAddress); // Remove .abi

// Middleware for parsing JSON requests
app.use(express.json()); 

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello! Your backend is running.');
});

// Route to interact with smart contract (Example: Creating a post)
app.post('/create-post', async (req, res) => {
  const { account, content } = req.body;
  try {
    // Add post content to IPFS
    const ipfsResponse = await ipfs.add(content);
    const ipfsHash = ipfsResponse.path;

    // Interact with smart contract to create a post
    const receipt = await socialMediaContract.methods.createPost(ipfsHash).send({ from: account });
    res.json({ success: true, transaction: receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to retrieve posts from the blockchain
app.get('/posts', async (req, res) => {
  try {
    const posts = await socialMediaContract.methods.getAllPosts().call();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ... rest of your server-side code

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
