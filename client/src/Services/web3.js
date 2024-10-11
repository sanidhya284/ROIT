import Web3 from 'web3';
import SocialMedia from '../artifacts/SocialMedia.json';

let web3;
let instance;

const initWeb3 = async () => {
  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SocialMedia.networks[networkId];
      instance = new web3.eth.Contract(SocialMedia.abi, deployedNetwork && deployedNetwork.address);

      console.log('Web3 connected and instance created.');
    } else {
      console.error('MetaMask not detected.');
    }
  } catch (error) {
    console.error('Error initializing web3:', error);
    // Handle connection or contract creation errors here (e.g., alert user)
  }
};

export const createPost = async (content) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const estimatedGas = await instance.methods.createPost(content).estimateGas();

    await instance.methods.createPost(content).send({ from: accounts[0], gasLimit: estimatedGas });

  } catch (error) {
    console.error('Error creating post:', error);
    // Handle specific error types like in blockchainService.js
  }
};

export default initWeb3;