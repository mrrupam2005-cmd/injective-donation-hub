import { ProposalService } from '../services/proposalService';
import { ProposalStatus, VotePayload, CreateProposalPayload } from '../lib/types';

/**
 * REST API client wrapper for listing proposals.
 */
export async function getProposals(status?: ProposalStatus) {
  if (status) {
    return await ProposalService.getProposalsByStatus(status);
  }
  return await ProposalService.getAllProposals();
}

/**
 * REST API client wrapper for retrieving proposal detail.
 */
export async function getProposalDetail(id: number) {
  return await ProposalService.getProposalById(id);
}

/**
 * REST API client wrapper for submitting vote.
 */
export async function postVote(payload: VotePayload, voterAddress: string) {
  return await ProposalService.submitVote(payload, voterAddress);
}

/**
 * REST API client wrapper for creating proposal.
 */
export async function postCreateProposal(payload: CreateProposalPayload, proposerAddress: string) {
  return await ProposalService.createProposal(payload, proposerAddress);
}

/**
 * REST API client wrapper for stats banner.
 */
export async function getStats() {
  return await ProposalService.getArenaStats();
}
