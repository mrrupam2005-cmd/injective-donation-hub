#!/usr/bin/env bash
set -e

echo "===================================================="
echo "📦 OPTIMIZING COSMWASM CONTRACT BINARY (DOCKER)"
echo "===================================================="

cd smart-contract

docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.15.0

cd ..

echo "✅ Optimized CosmWasm WASM artifact generated in artifacts/ directory!"
