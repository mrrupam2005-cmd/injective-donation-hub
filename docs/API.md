# 🔌 API & Endpoint Specifications

## Proposal Services

- `getAllProposals()`: Returns list of active, passed, rejected, and future proposals.
- `getProposalById(id)`: Returns individual proposal details.
- `submitVote(payload, voterAddress)`: Executes vote on-chain and updates proposal tallies.
- `createProposal(payload, proposerAddress)`: Instantiates new proposal.

## Wallet Services

- `connectWallet(walletType)`: Connects Keplr, Leap, MetaMask, or Ninji extensions.
- `fetchWalletBalance(address)`: Fetches INJ token balance and calculates voting power.
