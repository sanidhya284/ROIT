import web3 from './web3';
import Migrations from '../artifacts/Migrations.json';

const instance = new web3.eth.Contract(Migrations.abi, '0x9b311b1a5c861133d2eAf967C4c5Bf4903706c40');

export const getLastCompletedMigration = async () => {
  try {
    const lastCompleted = await instance.methods.last_completed_migration().call();
    return lastCompleted;
  } catch (error) {
    console.error("Error retrieving last completed migration:", error);
    throw error; // Re-throw the error for proper handling in calling functions
  }
};