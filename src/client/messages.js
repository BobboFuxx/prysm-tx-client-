const { MsgSend, MsgDelegate, MsgWithdrawDelegatorReward } = require("cosmjs-types/cosmos");
const { MsgTransfer } = require("cosmjs-types/ibc/applications/transfer/v1/tx");

// Create an IBC transfer message
function createIbcTransferMessage(senderAddress, recipientAddress, amount, sourceChannel, timeoutHeight) {
  return {
    typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
    value: MsgTransfer.fromPartial({
      sourcePort: "transfer",
      sourceChannel,
      sender: senderAddress,
      receiver: recipientAddress,
      token: { denom: "uprysm", amount: amount.toString() },
      timeoutHeight,
    }),
  };
}

// Create a staking delegate message
function createDelegateMessage(delegatorAddress, validatorAddress, amount) {
  return {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
    value: MsgDelegate.fromPartial({
      delegatorAddress,
      validatorAddress,
      amount: { denom: "uprysm", amount: amount.toString() },
    }),
  };
}

// Create a message for claiming staking rewards
function createClaimRewardsMessage(delegatorAddress, validatorAddress) {
  return {
    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    value: MsgWithdrawDelegatorReward.fromPartial({
      delegatorAddress,
      validatorAddress,
    }),
  };
}

module.exports = {
  createIbcTransferMessage,
  createDelegateMessage,
  createClaimRewardsMessage,
};
