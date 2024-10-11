import { ethers } from 'ethers';
import SocialMediaContract from '../artifacts/SocialMedia.json'; // Make sure to have the ABI

export const createPostOnBlockchain = async (content, signer) => {
    try {
        const contractAddress = '0xa3C6F23b15Aa4b90B9A7B3Eb9c81B9C768678c8F'; // Replace with your deployed contract address
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
    }
};