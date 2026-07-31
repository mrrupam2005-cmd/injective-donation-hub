#!/usr/bin/env bash
set -e

echo "===================================================="
echo "🧪 INJECTIVE VOTING ARENA - AUTOMATED TEST SUITE"
echo "===================================================="

echo "--> [1/2] Running TypeScript Type Check & Next Linting..."
npm run lint

echo "--> [2/2] Running CosmWasm Rust Contract Integration Tests..."
cd smart-contract
cargo test
cd ..

echo "✅ All Tests Passed Cleanly!"
