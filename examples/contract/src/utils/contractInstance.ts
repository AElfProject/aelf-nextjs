import AElf from 'aelf-sdk';
// create a new instance of AElf
// use our test environment url or prod environment url
const aelf = new AElf(new AElf.providers.HttpProvider('https://explorer-test.aelf.io/chain'));

// create a new wallet
const newWallet = AElf.wallet.createNewWallet();

/**
 * use token contract for examples to demonstrate how to get a contract instance.
 * @param tokenContractAddress address of token contract
 * @returns a contract instance.
 */
export const getContractInstance = async (tokenContractAddress: string) => {
  const tokenContract = await aelf.chain.contractAt(tokenContractAddress, newWallet);
  return tokenContract;
};
