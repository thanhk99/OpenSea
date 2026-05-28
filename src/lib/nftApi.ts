export type SaveMintedNftPayload = {
  tokenId: string
  txHash: string
  nftContractAddress: string
  ownerWallet: string
  metadataUri?: string
  name?: string
  description?: string
  imageUrl?: string
  status?: string
}

export async function saveMintedNft(payload: SaveMintedNftPayload) {
  const response = await fetch("http://localhost:8080/api/nfts/minted", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokenId: payload.tokenId,
      txHash: payload.txHash,
      nftContractAddress: payload.nftContractAddress,
      ownerWallet: payload.ownerWallet,
      metadataUri: payload.metadataUri,
      name: payload.name,
      description: payload.description,
      imageUrl: payload.imageUrl,
      status: payload.status ?? "MINTED",
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "Lưu NFT vào database thất bại")
  }

  return response.json()
}