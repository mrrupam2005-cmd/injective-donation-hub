use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::{Item, Map};

/// Governance Contract Configuration stored on-chain.
#[cw_serde]
pub struct Config {
    pub admin: Addr,
    pub quorum_percentage: u64, // e.g. 33%
    pub min_stake_amount: Uint128,
}

/// Proposal Status Enum stored in state.
#[cw_serde]
pub enum Status {
    Active,
    Passed,
    Rejected,
}

/// Individual Governance Proposal Data Schema.
#[cw_serde]
pub struct Proposal {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub proposer: Addr,
    pub status: Status,
    pub start_time: u64,
    pub end_time: u64,
    pub votes_for: Uint128,
    pub votes_against: Uint128,
    pub total_staked: Uint128,
    pub category: String,
}

/// Individual Vote Record Schema stored per voter and proposal.
#[cw_serde]
pub struct VoteRecord {
    pub voter: Addr,
    pub proposal_id: u64,
    pub option: String, // "FOR" or "AGAINST"
    pub amount: Uint128,
    pub timestamp: u64,
}

// Storage Keys
pub const CONFIG: Item<Config> = Item::new("config");
pub const PROPOSAL_COUNT: Item<u64> = Item::new("proposal_count");
pub const PROPOSALS: Map<u64, Proposal> = Map::new("proposals");

// Double-Voting Protection Map Key: (proposal_id, voter_addr) -> VoteRecord
pub const VOTES: Map<(u64, &Addr), VoteRecord> = Map::new("votes");
