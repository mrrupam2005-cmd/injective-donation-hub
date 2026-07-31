/**
 * Environmental Configuration Module for Injective Voting Arena.
 */

export const NETWORK_CONFIG = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Injective Voting Arena',
  network: process.env.NEXT_PUBLIC_INJECTIVE_NETWORK || 'testnet',
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || 'injective-888',
  rpcEndpoint: process.env.NEXT_PUBLIC_RPC_ENDPOINT || 'https://testnet.sentry.tm.injective.network:443',
  restEndpoint: process.env.NEXT_PUBLIC_REST_ENDPOINT || 'https://testnet.sentry.lcd.injective.network:443',
  grpcEndpoint: process.env.NEXT_PUBLIC_GRPC_ENDPOINT || 'https://testnet.sentry.chain.grpc.injective.network:443',
  contractAddress: process.env.NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS || 'inj14hj2tavq8fpesdwwxe544p6322ptch263k326m',
  explorerUrl: process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://testnet.explorer.injective.network',
  gasPrice: process.env.NEXT_PUBLIC_GAS_PRICE || '500000000',
  defaultGasLimit: parseInt(process.env.NEXT_PUBLIC_DEFAULT_GAS_LIMIT || '250000', 10),
};
