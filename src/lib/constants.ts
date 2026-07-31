import { Proposal, WalletType } from './types';

export const APP_NAME = 'Injective Voting Arena';
export const INJ_DENOM = 'inj';
export const INJ_DECIMALS = 18;
export const DEFAULT_GAS_PRICE = '500000000';

export const WALLET_PROVIDERS: { id: WalletType; name: string; icon: string; downloadUrl: string }[] = [
  {
    id: 'Keplr',
    name: 'Keplr Wallet',
    icon: '/logo.svg',
    downloadUrl: 'https://www.keplr.app/download',
  },
  {
    id: 'Leap',
    name: 'Leap Wallet',
    icon: '/logo.svg',
    downloadUrl: 'https://www.leapwallet.io',
  },
  {
    id: 'MetaMask',
    name: 'MetaMask (Injective)',
    icon: '/logo.svg',
    downloadUrl: 'https://metamask.io/download',
  },
  {
    id: 'Ninji',
    name: 'Ninji Wallet',
    icon: '/logo.svg',
    downloadUrl: 'https://ninji.xyz',
  },
];

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 101,
    title: 'INJ Burn Module V3 Acceleration & Dynamic Quorum Adjustment',
    description: 'Proposal to reduce auction interval from 7 days to 3.5 days and implement dynamic staking rewards for active governance voters across the Injective ecosystem.',
    proposer: 'inj14hj2tavq8fpesdwwxe544p6322ptch263k326m',
    status: 'Active',
    startTime: Date.now() - 86400000 * 2,
    endTime: Date.now() + 86400000 * 4,
    votesFor: '1452000.5',
    votesAgainst: '210400.0',
    totalStaked: '1662400.5',
    targetQuorum: '2000000.0',
    userVoted: null,
    category: 'Protocol',
  },
  {
    id: 102,
    title: 'Deploy Automated CosmWasm Liquidity Vaults on Injective Mainnet',
    description: 'Integrate automated cross-chain market making strategies with native zero-gas orderbooks to maximize capital efficiency for RWA and perpetual markets.',
    proposer: 'inj18u39x02kznlqw78s92pzm49xaq7zlkqj80xya',
    status: 'Active',
    startTime: Date.now() - 86400000 * 1,
    endTime: Date.now() + 86400000 * 5,
    votesFor: '3890100.0',
    votesAgainst: '41200.0',
    totalStaked: '3931300.0',
    targetQuorum: '3000000.0',
    userVoted: 'FOR',
    userStakeAmount: '250.0',
    category: 'Treasury',
  },
  {
    id: 103,
    title: 'Upgrade Injective Chain binary to v1.12.0 (EVM Next Integration)',
    description: 'Enables high-throughput EVM state synchronization directly within Cosmos SDK consensus without cross-chain bridge overhead.',
    proposer: 'inj1z9p5k8q32l0x89am55pzn90xa234kjl89asqw',
    status: 'Passed',
    startTime: Date.now() - 86400000 * 10,
    endTime: Date.now() - 86400000 * 3,
    votesFor: '9840500.0',
    votesAgainst: '150200.0',
    totalStaked: '9990700.0',
    targetQuorum: '5000000.0',
    userVoted: 'FOR',
    userStakeAmount: '500.0',
    category: 'Software Upgrade',
  },
  {
    id: 104,
    title: 'Community Ecosystem Grant: Multi-chain DAO Analytics Portal',
    description: 'Allocate 50,000 INJ from the Community Treasury to fund real-time telemetry dashboards for CosmWasm dApp metrics and voter participation tracking.',
    proposer: 'inj1x98qpwk20zk0ql90234a9x8zql19xa89z90qw',
    status: 'Future',
    startTime: Date.now() + 86400000 * 2,
    endTime: Date.now() + 86400000 * 9,
    votesFor: '0.0',
    votesAgainst: '0.0',
    totalStaked: '0.0',
    targetQuorum: '1500000.0',
    userVoted: null,
    category: 'Parameter',
  },
];
