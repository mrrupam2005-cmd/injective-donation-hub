# 🚀 Deployment Blueprint

## 1. Smart Contract Deployment (Injective Testnet)

```bash
cd smart-contract
cargo wasm
injectived tx wasm store ./target/wasm32-unknown-unknown/release/injective_voting_arena_contract.wasm --from <KEY> --chain-id injective-888 --node https://testnet.sentry.tm.injective.network:443 --gas auto -y
```

## 2. Frontend Deployment (Vercel)

```bash
npm run build
vercel --prod
```
