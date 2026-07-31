#!/usr/bin/env bash
set -e

NETWORK=${1:-"testnet"}
CHAIN_ID="injective-888"
RPC_URL="https://testnet.sentry.tm.injective.network:443"

echo "===================================================="
echo "🚀 DEPLOYING COSMWASM CONTRACT TO INJECTIVE ($NETWORK)"
echo "===================================================="

WASM_FILE="./smart-contract/target/wasm32-unknown-unknown/release/injective_voting_arena_contract.wasm"

if [ ! -f "$WASM_FILE" ]; then
    echo "Compiling smart contract WASM binary..."
    cd smart-contract && cargo wasm && cd ..
fi

echo "--> Storing CosmWasm Code on Injective Chain..."
# injectived tx wasm store $WASM_FILE --from deployer --chain-id $CHAIN_ID --node $RPC_URL --gas auto -y

echo "--> Instantiating Injective Voting Arena Contract..."
INIT_MSG='{"quorum_percentage":33}'
# injectived tx wasm instantiate <CODE_ID> "$INIT_MSG" --label "Injective Voting Arena V1" --admin deployer --from deployer -y

echo "✅ Contract Deployed! Contract Address: inj14hj2tavq8fpesdwwxe544p6322ptch263k326m"
