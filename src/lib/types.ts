/**
 * Core type definitions for Injective Voting Arena.
 */

export type ProposalStatus = 'Active' | 'Passed' | 'Rejected' | 'Future';

export type VoteOption = 'FOR' | 'AGAINST';

export type WalletType = 'Keplr' | 'Leap' | 'MetaMask' | 'Ninji';

export interface Proposal {
  id: number;
  title: string;
  description: string;
  proposer: string;
  status: ProposalStatus;
  startTime: number; // Unix timestamp (ms)
  endTime: number;   // Unix timestamp (ms)
  votesFor: string;   // INJ amount scaled
  votesAgainst: string; // INJ amount scaled
  totalStaked: string;  // Total INJ participating
  targetQuorum: string; // Required quorum INJ
  userVoted?: VoteOption | null;
  userStakeAmount?: string | null;
  category: 'Protocol' | 'Parameter' | 'Treasury' | 'Software Upgrade';
}

export interface VoteRecord {
  voter: string;
  proposalId: number;
  option: VoteOption;
  amount: string;
  timestamp: number;
  txHash: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  injAddress: string | null;
  walletType: WalletType | null;
  injBalance: string;
  votingPower: string;
  isConnecting: boolean;
}

export interface GasEstimate {
  gasWanted: number;
  feeAmount: string;
  denom: string;
}

export interface VotePayload {
  proposalId: number;
  option: VoteOption;
  amountInj: string;
}

export interface CreateProposalPayload {
  title: string;
  description: string;
  durationDays: number;
  category: string;
  initialDepositInj: string;
}

export interface ArenaStats {
  totalProposals: number;
  activeProposals: number;
  totalInjStaked: string;
  totalVoters: number;
}
