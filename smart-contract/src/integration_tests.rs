#[cfg(test)]
mod tests {
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_json, Uint128};

    use crate::contract::{execute, instantiate, query};
    use crate::error::ContractError;
    use crate::msg::{ExecuteMsg, InstantiateMsg, ProposalResponse, QueryMsg};

    #[test]
    fn test_initialization() {
        let mut deps = mock_dependencies();
        let msg = InstantiateMsg {
            admin: None,
            quorum_percentage: Some(33),
            min_stake_amount: None,
        };
        let info = mock_info("creator", &coins(1000, "inj"));
        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());
    }

    #[test]
    fn test_create_and_vote_proposal() {
        let mut deps = mock_dependencies();
        let env = mock_env();

        // 1. Instantiate
        let init_msg = InstantiateMsg {
            admin: None,
            quorum_percentage: Some(33),
            min_stake_amount: None,
        };
        let info = mock_info("admin", &[]);
        instantiate(deps.as_mut(), env.clone(), info, init_msg).unwrap();

        // 2. Create Proposal
        let create_msg = ExecuteMsg::CreateProposal {
            title: "Burn Rate Adjustment".to_string(),
            description: "Reduce interval".to_string(),
            duration_seconds: 86400,
            category: "Protocol".to_string(),
        };
        let user_info = mock_info("user1", &[]);
        let res = execute(deps.as_mut(), env.clone(), user_info, create_msg).unwrap();
        assert_eq!(res.attributes[0].value, "create_proposal");

        // 3. Vote FOR
        let vote_msg = ExecuteMsg::CastVote {
            proposal_id: 101,
            vote_option: "FOR".to_string(),
            stake_amount: Uint128::new(500),
        };
        let voter_info = mock_info("voter1", &[]);
        execute(deps.as_mut(), env.clone(), voter_info.clone(), vote_msg).unwrap();

        // 4. Query Proposal state
        let query_res = query(deps.as_ref(), env.clone(), QueryMsg::GetProposal { proposal_id: 101 }).unwrap();
        let prop_resp: ProposalResponse = from_json(&query_res).unwrap();
        assert_eq!(prop_resp.proposal.votes_for, Uint128::new(500));

        // 5. Verify Double Voting Failure
        let vote_again_msg = ExecuteMsg::CastVote {
            proposal_id: 101,
            vote_option: "AGAINST".to_string(),
            stake_amount: Uint128::new(100),
        };
        let err = execute(deps.as_mut(), env, voter_info, vote_again_msg).unwrap_err();
        assert!(matches!(err, ContractError::AlreadyVoted { .. }));
    }
}
