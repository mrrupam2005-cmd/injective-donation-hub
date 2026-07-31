#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Uint128,
};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::execute::{
    execute_cast_vote, execute_close_proposal, execute_create_proposal,
};
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::query::{
    query_all_proposals, query_config, query_proposal, query_vote_record,
};
use crate::state::{Config, CONFIG, PROPOSAL_COUNT};

const CONTRACT_NAME: &str = "crates.io:injective-voting-arena";
const CONTRACT_VERSION: &str = "1.0.0";

/// Instantiate Contract Entry Point.
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    let admin = msg
        .admin
        .map(|a| deps.api.addr_validate(&a))
        .transpose()?
        .unwrap_or(info.sender);

    let config = Config {
        admin: admin.clone(),
        quorum_percentage: msg.quorum_percentage.unwrap_or(33),
        min_stake_amount: msg.min_stake_amount.unwrap_or_else(|| Uint128::new(1_000_000)),
    };

    CONFIG.save(deps.storage, &config)?;
    PROPOSAL_COUNT.save(deps.storage, &100u64)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("admin", admin.to_string()))
}

/// Execute Contract Entry Point.
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CreateProposal {
            title,
            description,
            duration_seconds,
            category,
        } => execute_create_proposal(
            deps,
            env,
            info,
            title,
            description,
            duration_seconds,
            category,
        ),
        ExecuteMsg::CastVote {
            proposal_id,
            vote_option,
            stake_amount,
        } => execute_cast_vote(deps, env, info, proposal_id, vote_option, stake_amount),
        ExecuteMsg::CloseProposal { proposal_id } => {
            execute_close_proposal(deps, env, info, proposal_id)
        }
    }
}

/// Query Contract Entry Point.
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetConfig {} => to_json_binary(&query_config(deps)?),
        QueryMsg::GetProposal { proposal_id } => to_json_binary(&query_proposal(deps, proposal_id)?),
        QueryMsg::GetAllProposals { start_after, limit } => {
            to_json_binary(&query_all_proposals(deps, start_after, limit)?)
        }
        QueryMsg::GetVoteRecord { proposal_id, voter } => {
            to_json_binary(&query_vote_record(deps, proposal_id, voter)?)
        }
    }
}
