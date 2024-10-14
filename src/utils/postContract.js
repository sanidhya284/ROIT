// src/utils/postContract.js
// src/utils/postContract.js
import web3 from './web3';
import PostContract from './PostContract.json'; // Adjust the path as necessary

const contractAddress = '0x92acE4BCBC453044CD2F23bbcbDc693bcB811bdf'; // Replace with actual contract address
const postContract = new web3.eth.Contract(PostContract.abi, contractAddress);

export default postContract;
