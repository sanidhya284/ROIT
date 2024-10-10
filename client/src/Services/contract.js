import web3 from './web3';
import Migrations from '../build/contracts/Migrations.json';

const instance = new web3.eth.Contract(Migrations.abi, 'YOUR_CONTRACT_ADDRESS');

export const getLastCompletedMigration = async () => {
  const lastCompleted = await instance.methods.last_completed_migration().call();
  return lastCompleted;
};
