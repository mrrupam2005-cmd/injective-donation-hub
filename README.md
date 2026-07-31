# ⚡ Injective Voting Arena

> Next-Generation Cyberpunk Decentralized Governance Platform built on the Injective Blockchain.

[![Injective](https://img.shields.io/badge/Injective-CosmWasm-00F59B?style=for-the-badge&logo=cosmos)](https://injective.com)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**Injective Voting Arena** is a state-of-the-art Web3 dApp engineered for high-throughput, transparent, and decentralized community voting on the **Injective Network**. Featuring a dark futuristic cyberpunk UI, glassmorphic visual hierarchy, real-time vote metrics, zero-latency feedback loops, and robust CosmWasm smart contract enforcement, the platform sets a new benchmark for Cosmos-ecosystem governance interfaces.

---

## ✨ Key Features

- 🌌 **Cyberpunk Glassmorphism Design**: High-contrast dark visual aesthetics with neon green (`#00F59B`) and neon cyan (`#00E5FF`) accents, fluid Framer Motion animations, and blur effects.
- 🔒 **CosmWasm Smart Contract Backing**: Fully decentralized proposal creation, vote recording, stake verification, anti-double-voting protection, and execution phase handling.
- 💼 **Multi-Wallet Support Strategy**: Seamless connection for **Keplr**, **Leap**, **MetaMask** (EVM/Injective), and **Ninji** wallets with auto-reconnection and balance tracking.
- 📊 **Real-time Voting Analytics**: Dynamic visual progress bars, interactive stake percentage sliders, live INJ voting power calculation, gas estimations, and countdown timers.
- ⚡ **Next.js 15 App Router**: Server-rendered speed, client-side interactivity, strict TypeScript contracts, and responsive layout for mobile & desktop.
- 📜 **Full Hackathon Documentation**: Comprehensive architecture blueprints, smart contract specifications, security audit notes, and deployment automation scripts.

---

## 🏗️ Architecture Blueprint

```
+-------------------------------------------------------------------+
|                   INJECTIVE VOTING ARENA FRONTEND                 |
|       (Next.js 15 App Router + React 19 + Tailwind CSS)           |
+-------------------------------------------------------------------+
       |                                                    |
       v                                                    v
+-----------------------+                         +------------------+
|   Wallet Strategy     |                         | Injective TS SDK |
| (Keplr / Leap / Ninji)|                         |  (MsgExecuteContract)
+-----------------------+                         +------------------+
       |                                                    |
       +-------------------------+--------------------------+
                                 |
                                 v
+-------------------------------------------------------------------+
|               INJECTIVE BLOCKCHAIN (TESTNET/MAINNET)               |
|                 CosmWasm Smart Contract (Rust)                    |
|  - InstantiateMsg | ExecuteMsg (CastVote, Create) | QueryMsg      |
+-------------------------------------------------------------------+
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **pnpm** / **npm** / **yarn**
- **Rust & cargo-wasm**: `v1.75+` (for compiling smart contracts)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/injective/injective-voting-arena.git
cd injective-voting-arena
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and set your preferred network configurations:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Smart Contract Compilation & Deployment

### Build WASM Artifact
```bash
cd smart-contract
cargo wasm
```

### Test Smart Contract
```bash
cargo test
```

### Execute Deployment Script
```bash
chmod +x ./scripts/deploy.sh
./scripts/deploy.sh testnet
```

---

## 📁 Repository Structure

```
injective-voting-arena/
├── README.md                  # Main overview and instructions
├── LICENSE                    # MIT License
├── .env.example               # Environment variable templates
├── package.json               # NPM dependencies and scripts
├── next.config.js             # Next.js 15 configuration
├── tailwind.config.ts         # Cyberpunk design system tokens
├── smart-contract/            # CosmWasm Rust contract source
│   ├── Cargo.toml
│   └── src/
│       ├── contract.rs        # Main contract entry points
│       ├── execute.rs         # Proposal & voting execution
│       ├── query.rs           # State queries
│       ├── state.rs           # Database schemas
│       ├── msg.rs             # Instantiate / Execute / Query Msgs
│       └── integration_tests.rs
├── src/                       # Next.js app source
│   ├── app/                   # App Router pages & API
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Web3 & UI custom hooks
│   ├── lib/                   # Injective SDK & helper libraries
│   └── services/              # API and Smart Contract services
├── scripts/                   # Automated deployment & test bash scripts
└── docs/                      # Technical documentation blueprints
```

---

## 🛡️ Security & Auditing

- **Anti-Double-Voting**: Immutable mapping stored per proposal and voter address.
- **Timestamp Integrity**: Hard enforcement of voting start & end block timestamps.
- **Input Sanitization**: Client-side Zod validation coupled with CosmWasm string bound checks.

---

## 🏆 Hackathon Pitch Summary

Injective Voting Arena empowers governance participants by replacing dull transaction portals with an engaging, cyber-themed command center. By combining CosmWasm security with high-performance Web3 UX, users can effortlessly stake INJ, evaluate active governance proposals, track live quorum ratios, and execute protocol updates in seconds.

---

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 👥 Authors & Acknowledgments
- **Antigravity Web3 Engineering Team**
- **Injective Protocol Foundation**
