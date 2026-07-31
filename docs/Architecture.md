# 📐 Architecture Specification - Injective Voting Arena

## 1. System Context & Overview

**Injective Voting Arena** is designed as a decentralized high-throughput governance platform built natively for the **Injective Blockchain**. The architecture decouples on-chain state validation from rich client-side visualization.

```
[ User Browser ]
       |
       +---> Next.js 15 Client (React 19 + Tailwind CSS + Framer Motion)
                 |
                 +---> Wallet Strategy (Keplr / Leap / MetaMask / Ninji)
                 |
                 +---> Injective TS SDK (@injectivelabs/sdk-ts)
                            |
                            v
               [ Injective Chain Node ]
                       |
                       +---> CosmWasm Engine (Rust Smart Contract)
```

---

## 2. Core Layers

### A. Presentation Layer (Next.js 15 App Router)
- **Framework**: Next.js 15 using App Router and React Server/Client Components.
- **Styling**: Tailwind CSS extended with custom cyberpunk dark tokens (`#07090E`, `#00F59B`, `#00E5FF`).
- **Animations**: Framer Motion micro-interactions, scale transitions, and glow hover effects.

### B. Smart Contract Layer (CosmWasm Rust)
- **Environment**: CosmWasm 1.5 running on Cosmos SDK / Injective Tendermint BFT consensus.
- **Storage Strategy**:
  - `CONFIG`: Global contract metadata (`admin`, `quorum_percentage`, `min_stake_amount`).
  - `PROPOSALS`: `Map<u64, Proposal>` holding state, voting totals, and timestamps.
  - `VOTES`: `Map<(u64, &Addr), VoteRecord>` ensuring anti-double voting protection.

### C. Wallet Strategy & Web3 Providers
- Supports native Cosmos wallets (**Keplr**, **Leap**, **Ninji**) and EVM wallet derivatives (**MetaMask** via Injective address derivation).
