use cosmwasm_std::{
    attr, DepsMut, Env, MessageInfo, Response, Uint128,
};
use crate::error::ContractError;
use crate::helpers::{validate_duration, validate_vote_option};
use crate::state::{
    Proposal, Status, VoteRecord, PROPOSALS, PROPOSAL_COUNT, VOTES,
};

/// Creates a new proposal on-chain.
pub fn execute_create_proposal(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    title: String,
    description: String,
    duration_seconds: u64,
    category: String,
) -> Result<Response, ContractError> {
    validate_duration(duration_seconds)?;

    let count = PROPOSAL_COUNT.load(deps.storage)?;
    let new_id = count + 1;

    let start_time = env.block.time.seconds();
    let end_time = start_time + duration_seconds;

    let proposal = Proposal {
        id: new_id,
        title: title.clone(),
        description: description.clone(),
        proposer: info.sender.clone(),
        status: Status::Active,
        start_time,
        end_time,
        votes_for: Uint128::zero(),
        votes_against: Uint128::zero(),
        total_staked: Uint128::zero(),
        category: category.clone(),
    };

    PROPOSALS.save(deps.storage, new_id, &proposal)?;
    PROPOSAL_COUNT.save(deps.storage, &new_id)?;

    Ok(Response::new()
        .add_attribute("action", "create_proposal")
        .add_attribute("proposal_id", new_id.to_string())
        .add_attribute("proposer", info.sender.to_string())
        .add_attribute("title", title))
}

/// Casts a vote on an active proposal with double-vote prevention.
pub fn execute_cast_vote(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    proposal_id: u64,
    vote_option: String,
    stake_amount: Uint128,
) -> Result<Response, ContractError> {
    validate_vote_option(&vote_option)?;

    if stake_amount.is_zero() {
        return Err(ContractError::ZeroStake {});
    }

    let mut proposal = PROPOSALS
        .may_load(deps.storage, proposal_id)?
        .ok_or(ContractError::ProposalNotFound { id: proposal_id })?;

    if env.block.time.seconds() > proposal.end_time {
        return Err(ContractError::ProposalClosed { id: proposal_id });
    }

    // Double Voting Protection Check
    if VOTES.has(deps.storage, (proposal_id, &info.sender)) {
        return Err(ContractError::AlreadyVoted {
            voter: info.sender.to_string(),
            id: proposal_id,
        });
    }

    // Record Vote
    let upper_option = vote_option.to_uppercase();
    if upper_option == "FOR" {
        proposal.votes_for += stake_amount;
    } else {
        proposal.votes_against += stake_amount;
    }
    proposal.total_staked += stake_amount;

    PROPOSALS.save(deps.storage, proposal_id, &proposal)?;

    let vote_record = VoteRecord {
        voter: info.sender.clone(),
        proposal_id,
        option: upper_option.clone(),
        amount: stake_amount,
        timestamp: env.block.time.seconds(),
    };
    VOTES.save(deps.storage, (proposal_id, &info.sender), &vote_record)?;

    Ok(Response::new()
        .add_attribute("action", "cast_vote")
        .add_attribute("proposal_id", proposal_id.to_string())
        .add_attribute("voter", info.sender.to_string())
        .add_attribute("option", upper_option)
        .add_attribute("stake_amount", stake_amount.to_string()))
}

/// Closes a proposal after duration has expired and calculates final status.
pub fn execute_close_proposal(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    proposal_id: u64,
) -> Result<Response, ContractError> {
    let mut proposal = PROPOSALS
        .may_load(deps.storage, proposal_id)?
        .ok_or(ContractError::ProposalNotFound { id: proposal_id })?;

    if env.block.time.seconds() < proposal.end_time {
        return Err(ContractError::ProposalNotEnded { id: proposal_id });
    }

    if proposal.votes_for > proposal.votes_against {
        proposal.status = Status::Passed;
    } else {
        proposal.status = Status::Rejected;
    }

    PROPOSALS.save(deps.storage, proposal_id, &proposal)?;

    Ok(Response::new()
        .add_attribute("action", "close_proposal")
        .add_attribute("proposal_id", proposal_id.to_string())
        .add_attribute("final_status", format!("{:?}", proposal.status)))
}
