const { SigningStargateClient } = require("@cosmjs/stargate");
const { RPC_ENDPOINT } = require("../config/constants");

// Fetch account info from the RPC node
async function getAccountInfo(address) {
  const client = await SigningStargateClient.connect(RPC_ENDPOINT);
  const account = await client.getAccount(address);

  if (!account) {
    throw new Error(`Account not found: ${address}`);
  }
  
  return account;
}

// Broadcast the transaction
async function broadcastTransaction(signedTx) {
  const client = await SigningStargateClient.connect(RPC_ENDPOINT);
  const result = await client.broadcastTx(signedTx);
  
  if (result.code !== 0) {
    throw new Error(`Transaction failed: ${result.rawLog}`);
  }
  
  return result.transactionHash;
}

module.exports = { getAccountInfo, broadcastTransaction };
