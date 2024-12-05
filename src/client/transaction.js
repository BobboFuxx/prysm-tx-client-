const { makeSignDoc } = require("@cosmjs/proto-signing");
const { CHAIN_ID, DENOM } = require("../config/constants");

async function createTransaction({
  senderAddress,
  messages,
  sequence,
  accountNumber,
  gasLimit = 200000,
  feeAmount = "2000",
  memo = "",
}) {
  return makeSignDoc(
    messages,
    {
      amount: [{ denom: DENOM, amount: feeAmount }],
      gas: gasLimit.toString(),
    },
    CHAIN_ID,
    memo,
    accountNumber,
    sequence
  );
}

module.exports = { createTransaction };
