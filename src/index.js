require("dotenv").config();
const { getAccountInfo, broadcastTransaction } = require("./client/utils");
const { createIbcTransferMessage, createDelegateMessage, createClaimRewardsMessage } = require("./client/messages");
const { createTransaction } = require("./client/transaction");

(async () => {
  try {
    const senderAddress = "prysm1...";
    const recipientAddress = "prysm1...";
    const validatorAddress = "prysmvaloper1...";
    const account = await getAccountInfo(senderAddress);

    const { accountNumber, sequence } = account;

    // Construct messages
    const ibcMessage = createIbcTransferMessage(senderAddress, recipientAddress, 1000000, "channel-0", { revisionHeight: 123456 });
    const delegateMessage = createDelegateMessage(senderAddress, validatorAddress, 500000);
    const claimRewardsMessage = createClaimRewardsMessage(senderAddress, validatorAddress);

    const messages = [ibcMessage, delegateMessage, claimRewardsMessage];

    // Create transaction
    const transaction = await createTransaction({
      senderAddress,
      messages,
      sequence,
      accountNumber,
    });

    console.log("Transaction created:", transaction);

    // Example: Offline signing and broadcasting
    // const signedTx = await signTransaction(transaction, privateKey);
    // const txHash = await broadcastTransaction(signedTx);

    console.log("Transaction broadcasted successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
