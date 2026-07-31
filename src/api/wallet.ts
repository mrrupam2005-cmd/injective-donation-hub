import { WalletState } from '../lib/types';
import { WalletService } from '../services/walletService';

/**
 * Fetches updated wallet state and balance information for an address.
 */
export async function fetchWalletBalance(address: string): Promise<{ injBalance: string; votingPower: string }> {
  try {
    // In production, queries REST node endpoint /cosmos/bank/v1beta1/balances/{address}
    const simulatedInj = (Math.random() * 500 + 100).toFixed(2);
    return {
      injBalance: simulatedInj,
      votingPower: (parseFloat(simulatedInj) * 1.5).toFixed(2),
    };
  } catch (error) {
    return { injBalance: '0.00', votingPower: '0.00' };
  }
}

/**
 * Triggers wallet session initiation.
 */
export async function connectWalletApi(walletType: any): Promise<WalletState> {
  return await WalletService.connectWallet(walletType);
}
