use cosmwasm_std::StdError;
use thiserror::Error;

/// Custom error types returned by the Injective Voting Arena CosmWasm contract.
#[derive(Error, Debug, PartialEq)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized: Sender does not have permission to execute this operation")]
    Unauthorized {},

    #[error("ProposalNotFound: Proposal with ID {id} does not exist")]
    ProposalNotFound { id: u64 },

    #[error("ProposalClosed: Voting period has ended for Proposal #{id}")]
    ProposalClosed { id: u64 },

    #[error("ProposalNotEnded: Voting period is still active for Proposal #{id}")]
    ProposalNotEnded { id: u64 },

    #[error("AlreadyVoted: Voter {voter} has already cast a vote on Proposal #{id}")]
    AlreadyVoted { voter: String, id: u64 },

    #[error("ZeroStake: Vote weight must be greater than 0 INJ")]
    ZeroStake {},

    #[error("InvalidDuration: Proposal duration must be between 1 hour and 14 days")]
    InvalidDuration {},

    #[error("InvalidOption: Vote option must be 'FOR' or 'AGAINST'")]
    InvalidOption {},
}
