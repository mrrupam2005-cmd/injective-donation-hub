import { Proposal, ProposalStatus, VotePayload, CreateProposalPayload, ArenaStats } from '../lib/types';
import { INITIAL_PROPOSALS } from '../lib/constants';

// Internal memory store for dynamic frontend proposals state
let proposalStore: Proposal[] = [...INITIAL_PROPOSALS];

export class ProposalService {
  /**
   * Retrieves all proposals across all statuses.
   */
  static async getAllProposals(): Promise<Proposal[]> {
    // Simulate slight network latency for seamless loading UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...proposalStore];
  }

  /**
   * Retrieves proposals filtered by status (Active, Passed, Rejected, Future).
   */
  static async getProposalsByStatus(status: ProposalStatus): Promise<Proposal[]> {
    const proposals = await this.getAllProposals();
    return proposals.filter((p) => p.status === status);
  }

  /**
   * Retrieves a single proposal by ID.
   */
  static async getProposalById(id: number): Promise<Proposal | null> {
    const proposals = await this.getAllProposals();
    return proposals.find((p) => p.id === id) || null;
  }

  /**
   * Submits a user vote on a proposal.
   */
  static async submitVote(payload: VotePayload, voterAddress: string): Promise<{ txHash: string; updatedProposal: Proposal }> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const index = proposalStore.findIndex((p) => p.id === payload.proposalId);
    if (index === -1) {
      throw new Error(`Proposal ID ${payload.proposalId} not found`);
    }

    const target = proposalStore[index];
    if (target.status !== 'Active') {
      throw new Error('Voting is closed for this proposal');
    }

    const voteAmountNum = parseFloat(payload.amountInj);
    const currentFor = parseFloat(target.votesFor);
    const currentAgainst = parseFloat(target.votesAgainst);
    const currentTotal = parseFloat(target.totalStaked);

    let updatedFor = currentFor;
    let updatedAgainst = currentAgainst;

    if (payload.option === 'FOR') {
      updatedFor += voteAmountNum;
    } else {
      updatedAgainst += voteAmountNum;
    }

    const updatedProposal: Proposal = {
      ...target,
      votesFor: updatedFor.toFixed(1),
      votesAgainst: updatedAgainst.toFixed(1),
      totalStaked: (currentTotal + voteAmountNum).toFixed(1),
      userVoted: payload.option,
      userStakeAmount: payload.amountInj,
    };

    proposalStore[index] = updatedProposal;

    const dummyTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    return {
      txHash: dummyTxHash,
      updatedProposal,
    };
  }

  /**
   * Creates a new governance proposal.
   */
  static async createProposal(payload: CreateProposalPayload, proposerAddress: string): Promise<Proposal> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newId = proposalStore.length > 0 ? Math.max(...proposalStore.map((p) => p.id)) + 1 : 101;
    const now = Date.now();

    const newProposal: Proposal = {
      id: newId,
      title: payload.title,
      description: payload.description,
      proposer: proposerAddress,
      status: 'Active',
      startTime: now,
      endTime: now + payload.durationDays * 86400000,
      votesFor: payload.initialDepositInj || '100.0',
      votesAgainst: '0.0',
      totalStaked: payload.initialDepositInj || '100.0',
      targetQuorum: '2500000.0',
      userVoted: 'FOR',
      userStakeAmount: payload.initialDepositInj || '100.0',
      category: (payload.category as any) || 'Protocol',
    };

    proposalStore.unshift(newProposal);
    return newProposal;
  }

  /**
   * Computes platform-wide aggregated metrics.
   */
  static async getArenaStats(): Promise<ArenaStats> {
    const proposals = await this.getAllProposals();
    const active = proposals.filter((p) => p.status === 'Active').length;
    const totalStakedNum = proposals.reduce((acc, curr) => acc + parseFloat(curr.totalStaked), 0);

    return {
      totalProposals: proposals.length,
      activeProposals: active,
      totalInjStaked: totalStakedNum.toFixed(1),
      totalVoters: 1420,
    };
  }
}
