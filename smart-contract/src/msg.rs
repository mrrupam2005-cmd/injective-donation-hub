use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;
use crate::state::{Config, Proposal, VoteRecord};

/// Initialization message payload when deploying contract.
#[cw_serde]
pub struct InstantiateMsg {
    pub admin: Option<String>,
    pub quorum_percentage: Option<u64>,
    pub min_stake_amount: Option<Uint128>,
}

/// Execute transactions executable by users & callers.
#[cw_serde]
pub enum ExecuteMsg {
    CreateProposal {
        title: String,
        description: String,
        duration_seconds: u64,
        category: String,
    },
    CastVote {
        proposal_id: u64,
        vote_option: String,
        stake_amount: Uint128,
    },
    CloseProposal {
        proposal_id: u64,
    },
}

/// Read-only state query messages.
#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ConfigResponse)]
    GetConfig {},

    #[returns(ProposalResponse)]
    GetProposal { proposal_id: u64 },

    #[returns(ProposalsResponse)]
    GetAllProposals { start_after: Option<u64>, limit: Option<u32> },

    #[returns(VoteResponse)]
    GetVoteRecord { proposal_id: u64, voter: String },
}

#[cw_serde]
pub struct ConfigResponse {
    pub config: Config,
}

#[cw_serde]
pub struct ProposalResponse {
    pub proposal: Proposal,
}

#[cw_serde]
pub struct ProposalsResponse {
    pub proposals: Vec<Proposal>,
}

#[cw_serde]
pub struct VoteResponse {
    pub vote: Option<VoteRecord>,
}
