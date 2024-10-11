import { create } from 'ipfs-http-client';

// Connect to IPFS
const ipfs = create('https://ipfs.infura.io:5001');

export const uploadToIPFS = async (file) => {
  try {
    const added = await ipfs.add(file);
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  } catch (error) {
    console.error('Error uploading file: ', error);
  }
};

