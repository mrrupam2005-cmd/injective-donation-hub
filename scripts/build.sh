#!/usr/bin/env bash
set -e

echo "===================================================="
echo "⚡ INJECTIVE VOTING ARENA - COMPILATION & BUILD"
echo "===================================================="

echo "--> [1/2] Building Next.js Frontend Production Assets..."
npm run build

echo "--> [2/2] Compiling CosmWasm Smart Contract WASM Target..."
cd smart-contract
cargo wasm
cd ..

echo "✅ Build Process Completed Successfully!"
