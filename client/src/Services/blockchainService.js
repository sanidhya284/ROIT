import { ethers } from 'ethers';
import SocialMediaContract from '../artifacts/SocialMedia.json'; // Make sure to have the ABI
export const fetchFollowsData = async (userAddress, followType) => {
    try {
        const socialMediaContract = new ethers.Contract(contractAddress, SocialMediaContract.abi);
        const contractAddress = '0x9b311b1a5c861133d2eAf967C4c5Bf4903706c40'; // Replace with your deployed contract address
      const follows = await socialMediaContract.methods.getFollows(userAddress, followType).call();
      return follows;
    } catch (error) {
      console.error('Error fetching follows data:', error);
      return []; // Return an empty array in case of error
    }
  };
export const fetchMessagesData = async (userAddress) => {
    try {
        const socialMediaContract = new ethers.Contract(contractAddress, SocialMediaContract.abi);
        const contractAddress = '0x9b311b1a5c861133d2eAf967C4c5Bf4903706c40'; // Replace with your deployed contract address
        const messages = await socialMediaContract.methods.getMessages(userAddress).call();
        return messages;
    } catch (error) {
        console.error("Error fetching messages data:", error);
        return []; // Return an empty array in case of error
    }
};

export const createPostOnBlockchain = async (content, signer) => {
    try {
        const contractAddress = '0x9b311b1a5c861133d2eAf967C4c5Bf4903706c40'; // Replace with your deployed contract address
        const socialMedia = new ethers.Contract(contractAddress, SocialMediaContract.abi, signer);

        // Validate input data (e.g., ensure content is not empty)
        if (!content.trim()) {
            throw new Error("Content cannot be empty.");
        }

        // Estimate gas for the transaction
        const estimatedGas = await socialMedia.estimateGas.createPost(content);

        // Call the createPost function with estimated gas
        const transaction = await socialMedia.createPost(content, { gasLimit: estimatedGas });

        // Wait for the transaction to be mined
        await transaction.wait();
        console.log("Post created on blockchain!");

        // Fetch the newly created post (adjust based on your smart contract)
        const fetchedPost = await socialMedia.methods.getPost(transaction.hash).call();
        return fetchedPost;

    } catch (error) {
        console.error("Error interacting with smart contract:", error);
        alert("Error interacting with blockchain");

        // Handle specific error types
        if (error.code === 4001) {
            alert("User denied transaction confirmation in MetaMask.");
        } else if (error.code === -32000) {
            alert("Transaction reverted. Check if the contract logic is correct.");
        } else if (error.message.includes("insufficient funds")) {
            alert("Insufficient funds. Please ensure you have enough ETH.");
        } else {
            alert("An error occurred while creating the post.");
        }

        // Rethrow the error for further handling if needed
        throw error;
    }
    
};