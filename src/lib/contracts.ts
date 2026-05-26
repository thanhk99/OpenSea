import { ethers } from "ethers";

import {
  NFT_CONTRACT_ADDRESS,
  NFT_ABI,
} from "@/constants/constant"


;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function getNFTContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    NFT_CONTRACT_ADDRESS,
    NFT_ABI,
    signer
  );

  return contract;
}