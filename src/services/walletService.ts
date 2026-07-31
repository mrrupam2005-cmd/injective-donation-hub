import { WalletType, WalletState } from '../lib/types';
import { NETWORK_CONFIG } from '../lib/config';

declare global {
  interface Window {
    keplr?: any;
    leap?: any;
    ethereum?: any;
    ninji?: any;
  }
}

/**
 * Service for connecting, disconnecting, and querying status across Injective-supported Cosmos & EVM wallets.
 */
export class WalletService {
  /**
   * Connects to the specified browser extension wallet.
   */
  static async connectWallet(type: WalletType): Promise<WalletState> {
    if (typeof window === 'undefined') {
      throw new Error('Window environment unavailable');
    }

    let address = '';
    let injAddress = '';

    switch (type) {
      case 'Keplr': {
        if (!window.keplr) {
          throw new Error('Keplr wallet extension is not installed');
        }
        await window.keplr.enable(NETWORK_CONFIG.chainId);
        const offlineSigner = window.keplr.getOfflineSigner(NETWORK_CONFIG.chainId);
        const accounts = await offlineSigner.getAccounts();
        if (!accounts || accounts.length === 0) throw new Error('No Keplr account found');
        address = accounts[0].address;
        injAddress = address;
        break;
      }
      case 'Leap': {
        if (!window.leap) {
          throw new Error('Leap wallet extension is not installed');
        }
        await window.leap.enable(NETWORK_CONFIG.chainId);
        const offlineSigner = window.leap.getOfflineSigner(NETWORK_CONFIG.chainId);
        const accounts = await offlineSigner.getAccounts();
        if (!accounts || accounts.length === 0) throw new Error('No Leap account found');
        address = accounts[0].address;
        injAddress = address;
        break;
      }
      case 'Ninji': {
        if (!window.ninji) {
          throw new Error('Ninji wallet extension is not installed');
        }
        await window.ninji.enable(NETWORK_CONFIG.chainId);
        const accounts = await window.ninji.getAccounts();
        if (!accounts || accounts.length === 0) throw new Error('No Ninji account found');
        address = accounts[0].address;
        injAddress = address;
        break;
      }
      case 'MetaMask': {
        if (!window.ethereum) {
          throw new Error('MetaMask browser extension is not installed');
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (!accounts || accounts.length === 0) throw new Error('No MetaMask account found');
        address = accounts[0];
        // Derived dummy Injective address format for EVM connection demonstration
        injAddress = `inj${address.substring(2, 40)}`;
        break;
      }
      default:
        throw new Error(`Unsupported wallet type: ${type}`);
    }

    // Mock balance check for active voting power initialization
    const injBalance = (Math.random() * 850 + 150).toFixed(2);
    const votingPower = (parseFloat(injBalance) * 1.5).toFixed(2);

    return {
      isConnected: true,
      address,
      injAddress,
      walletType: type,
      injBalance,
      votingPower,
      isConnecting: false,
    };
  }

  /**
   * Disconnects active wallet session.
   */
  static disconnectWallet(): WalletState {
    return {
      isConnected: false,
      address: null,
      injAddress: null,
      walletType: null,
      injBalance: '0.00',
      votingPower: '0.00',
      isConnecting: false,
    };
  }
}
