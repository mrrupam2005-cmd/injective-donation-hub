# 📜 CosmWasm Smart Contract Specification

## 1. Execute Messages

### `CreateProposal`
Creates a new governance proposal.
```json
{
  "create_proposal": {
    "title": "INJ Burn Module V3",
    "description": "Adjust burn frequency to 3.5 days",
    "duration_seconds": 604800,
    "category": "Protocol"
  }
}
```

### `CastVote`
Casts a FOR or AGAINST vote with INJ stake weight. Prevents double-voting per wallet address.
```json
{
  "cast_vote": {
    "proposal_id": 101,
    "vote_option": "FOR",
    "stake_amount": "500000000000000000000"
  }
}
```

### `CloseProposal`
Finalizes voting results once end timestamp is passed.
```json
{
  "close_proposal": {
    "proposal_id": 101
  }
}
```

---

## 2. Query Messages

- `GetConfig`: Returns contract configuration.
- `GetProposal { proposal_id }`: Returns proposal detail.
- `GetAllProposals { start_after, limit }`: Returns paginated proposal list.
- `GetVoteRecord { proposal_id, voter }`: Queries voter submission.
