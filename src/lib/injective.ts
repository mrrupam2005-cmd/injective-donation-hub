import { NETWORK_CONFIG } from './config';

/**
 * Injective Network Client Helper.
 * Handles CosmWasm execution message crafting and RPC communication wrappers.
 */

export interface CosmWasmExecuteMsg {
  cast_vote?: {
    proposal_id: number;
    vote_option: string;
    stake_amount: string;
  };
  create_proposal?: {
    title: string;
    description: string;
    duration_seconds: number;
    category: string;
  };
  close_proposal?: {
    proposal_id: number;
  };
}

export interface CosmWasmQueryMsg {
  get_proposal?: { proposal_id: number };
  get_all_proposals?: { start_after?: number; limit?: number };
  get_vote_record?: { proposal_id: number; voter: string };
  get_config?: Record<string, never>;
}

/**
 * Constructs an Injective CosmWasm execute transaction message body.
 */
export function buildExecuteContractMsg(
  senderAddress: string,
  contractAddress: string,
  msg: CosmWasmExecuteMsg,
  fundsInj = '0'
) {
  return {
    type: 'wasm/MsgExecuteContract',
    value: {
      sender: senderAddress,
      contract: contractAddress || NETWORK_CONFIG.contractAddress,
      msg: Buffer.from(JSON.stringify(msg)).toString('base64'),
      funds: fundsInj !== '0' ? [{ denom: 'inj', amount: fundsInj }] : [],
    },
  };
}

/**
 * Encodes query payload for standard CosmWasm smart contract REST/gRPC queries.
 */
export function encodeQueryMsg(queryMsg: CosmWasmQueryMsg): string {
  return encodeURIComponent(Buffer.from(JSON.stringify(queryMsg)).toString('base64'));
}
