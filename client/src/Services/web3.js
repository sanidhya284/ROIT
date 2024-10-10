import Web3 from 'web3';
import SocialMedia from '../contracts/SocialMedia.json';

let web3;
let instance;

const initWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SocialMedia.networks[networkId];
    instance = new web3.eth.Contract(SocialMedia.abi, deployedNetwork && deployedNetwork.address);
  }
};

export const createPost = async (content) => {
  const accounts = await web3.eth.getAccounts();
  await instance.methods.createPost(content).send({ from: accounts[0] });
};

export default initWeb3;
