import { NETWORK_CONFIG } from '../lib/config';
import { buildExecuteContractMsg, encodeQueryMsg } from '../lib/injective';
import { VotePayload, CreateProposalPayload, GasEstimate } from '../lib/types';

export class ContractService {
  /**
   * Estimates transaction gas fee for voting execution.
   */
  static async estimateVoteGas(payload: VotePayload): Promise<GasEstimate> {
    // Simulated gas estimation calculation based on payload payload payload
    const baseGas = 160000;
    const dynamicGas = Math.floor(Math.random() * 20000) + baseGas;
    const feeAmount = (dynamicGas * 500).toString(); // in inj gas units

    return {
      gasWanted: dynamicGas,
      feeAmount: '0.0005',
      denom: 'INJ',
    };
  }

  /**
   * Constructs the execute payload for casting a vote on-chain.
   */
  static prepareCastVoteMsg(voterAddress: string, payload: VotePayload) {
    const cosmWasmMsg = {
      cast_vote: {
        proposal_id: payload.proposalId,
        vote_option: payload.option,
        stake_amount: payload.amountInj,
      },
    };

    return buildExecuteContractMsg(voterAddress, NETWORK_CONFIG.contractAddress, cosmWasmMsg);
  }

  /**
   * Constructs the execute payload for creating a proposal on-chain.
   */
  static prepareCreateProposalMsg(proposerAddress: string, payload: CreateProposalPayload) {
    const cosmWasmMsg = {
      create_proposal: {
        title: payload.title,
        description: payload.description,
        duration_seconds: payload.durationDays * 86400,
        category: payload.category,
      },
    };

    return buildExecuteContractMsg(
      proposerAddress,
      NETWORK_CONFIG.contractAddress,
      cosmWasmMsg,
      payload.initialDepositInj
    );
  }

  /**
   * Queries proposal details directly from CosmWasm contract endpoint.
   */
  static async queryContractProposal(proposalId: number): Promise<any> {
    const queryMsg = { get_proposal: { proposal_id: proposalId } };
    const queryBase64 = encodeQueryMsg(queryMsg);
    const queryUrl = `${NETWORK_CONFIG.restEndpoint}/cosmwasm/wasm/v1/contract/${NETWORK_CONFIG.contractAddress}/smart/${queryBase64}`;

    try {
      const response = await fetch(queryUrl);
      if (!response.ok) throw new Error('Contract query failed');
      const data = await response.json();
      return data?.data;
    } catch (error) {
      // Fallback query payload for local / off-chain testing
      return null;
    }
  }
}
