import web3 from './web3';
import Migrations from '../artifacts/Migrations.json';

const instance = new web3.eth.Contract(Migrations.abi, '0xa3C6F23b15Aa4b90B9A7B3Eb9c81B9C768678c8F');

export const getLastCompletedMigration = async () => {
  try {
    const lastCompleted = await instance.methods.last_completed_migration().call();
    return lastCompleted;
  } catch (error) {
    console.error("Error retrieving last completed migration:", error);
    throw error; // Re-throw the error for proper handling in calling functions
  }
};