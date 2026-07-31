use crate::error::ContractError;

/// Validates vote option string format ("FOR" or "AGAINST").
pub fn validate_vote_option(option: &str) -> Result<(), ContractError> {
    let upper = option.to_uppercase();
    if upper != "FOR" && upper != "AGAINST" {
        return Err(ContractError::InvalidOption {});
    }
    Ok(())
}

/// Validates proposal voting duration in seconds (between 1 hour and 14 days).
pub fn validate_duration(duration_seconds: u64) -> Result<(), ContractError> {
    const MIN_DURATION: u64 = 3600; // 1 hour
    const MAX_DURATION: u64 = 14 * 86400; // 14 days

    if duration_seconds < MIN_DURATION || duration_seconds > MAX_DURATION {
        return Err(ContractError::InvalidDuration {});
    }
    Ok(())
}
