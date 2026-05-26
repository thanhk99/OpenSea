import { http, createConfig } from 'wagmi'
import { hardhat, localhost } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [hardhat, localhost],
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(),
    [localhost.id]: http(),
  },
})
