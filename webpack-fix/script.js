import http from "k6/http";
import { ethers } from "hardhat";
import { v4 as uuidv4 } from "uuid";

export const options = {
  vus: 10,
  duration: "30s",
};

async function generateBody() {
  const contractAddress = "0xa54D88CB4a7078395EC3D68C8A1e099447d9F8f8";
  const senderPrivateKey = "PRIVATE_KEY";

  // Connect to an Ethereum node
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const senderWallet = new ethers.Wallet(senderPrivateKey, provider);

  const transaction = {
    to: contractAddress,
    from: "0xc0564936887A70d976F74d75237405e2b5e5588C",
    value: 0,
    gasLimit: 210000,
    gasPrice: utils.parseUnits("0", "gwei"),
    data: erc20Contract.interface.encodeFunctionData("storeHash", [
      uuidv4(),
      ["0x38654fa39dbce6316e027466d616b148fb92fc34cb9c018549b8a70178e8f422"],
    ]),
  };

  const signedTransaction = await senderWallet.signTransaction(transaction);

  const body = {
    jsonrpc: "2.0",
    method: "eth_sendRawTransaction",
    params: [signedTransaction],
    id: 1,
  };

  return body;
}

export default async function () {
  http.post("http://127.0.0.1:8545", JSON.stringify(await generateBody()), {
    headers: {
      "Content-type": "application/json",
    },
  });
}
