use cosmwasm_std::{Deps, Order, StdResult};
use cw_storage_plus::Bound;
use crate::error::ContractError;
use crate::msg::{ConfigResponse, ProposalResponse, ProposalsResponse, VoteResponse};
use crate::state::{CONFIG, PROPOSALS, VOTES};

/// Queries system configuration.
pub fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let config = CONFIG.load(deps.storage)?;
    Ok(ConfigResponse { config })
}

/// Queries a single proposal by numeric ID.
pub fn query_proposal(deps: Deps, proposal_id: u64) -> Result<ProposalResponse, ContractError> {
    let proposal = PROPOSALS.may_load(deps.storage, proposal_id)?;
    match proposal {
        Some(p) => Ok(ProposalResponse { proposal: p }),
        None => Err(ContractError::ProposalNotFound { id: proposal_id }),
    }
}

/// Queries paginated proposals.
pub fn query_all_proposals(
    deps: Deps,
    start_after: Option<u64>,
    limit: Option<u32>,
) -> StdResult<ProposalsResponse> {
    let limit = limit.unwrap_or(30) as usize;
    let start = start_after.map(Bound::exclusive);

    let proposals: StdResult<Vec<_>> = PROPOSALS
        .range(deps.storage, start, None, Order::Descending)
        .take(limit)
        .map(|item| item.map(|(_, p)| p))
        .collect();

    Ok(ProposalsResponse {
        proposals: proposals?,
    })
}

/// Queries a voter's vote record on a given proposal.
pub fn query_vote_record(deps: Deps, proposal_id: u64, voter: String) -> StdResult<VoteResponse> {
    let voter_addr = deps.api.addr_validate(&voter)?;
    let vote = VOTES.may_load(deps.storage, (proposal_id, &voter_addr))?;
    Ok(VoteResponse { vote })
}
