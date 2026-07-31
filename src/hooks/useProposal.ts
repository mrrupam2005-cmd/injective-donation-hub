import { useState, useEffect, useCallback } from 'react';
import { Proposal, ProposalStatus, VotePayload, CreateProposalPayload } from '../lib/types';
import { ProposalService } from '../services/proposalService';
import { useToast } from './useToast';

export function useProposal(status?: ProposalStatus) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError, showLoading, dismissToast } = useToast();

  const fetchProposals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data: Proposal[];
      if (status) {
        data = await ProposalService.getProposalsByStatus(status);
      } else {
        data = await ProposalService.getAllProposals();
      }
      setProposals(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch proposals');
      showError('Failed to fetch proposals from Injective network');
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const castVote = async (payload: VotePayload, voterAddress: string) => {
    const toastId = showLoading(`Broadcasting ${payload.option} vote to CosmWasm contract...`);
    try {
      const { txHash, updatedProposal } = await ProposalService.submitVote(payload, voterAddress);
      dismissToast(toastId);
      showSuccess(`Vote of ${payload.amountInj} INJ recorded! Tx: ${txHash.substring(0, 10)}...`, txHash);
      
      // Update local proposals state
      setProposals((prev) =>
        prev.map((p) => (p.id === updatedProposal.id ? updatedProposal : p))
      );
      return updatedProposal;
    } catch (err: any) {
      dismissToast(toastId);
      showError(err.message || 'Failed to submit vote');
      throw err;
    }
  };

  const createProposal = async (payload: CreateProposalPayload, proposerAddress: string) => {
    const toastId = showLoading('Instantiating proposal on-chain...');
    try {
      const newProposal = await ProposalService.createProposal(payload, proposerAddress);
      dismissToast(toastId);
      showSuccess(`Proposal #${newProposal.id} created successfully!`);
      setProposals((prev) => [newProposal, ...prev]);
      return newProposal;
    } catch (err: any) {
      dismissToast(toastId);
      showError(err.message || 'Failed to create proposal');
      throw err;
    }
  };

  return {
    proposals,
    isLoading,
    error,
    refetch: fetchProposals,
    castVote,
    createProposal,
  };
}
