'use client';

import React, { createContext, useState, useEffect } from 'react';
import { WalletState, WalletType } from '../../lib/types';
import { WalletService } from '../../services/walletService';

interface WalletContextType {
  walletState: WalletState;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  connect: (type: WalletType) => Promise<void>;
  disconnect: () => void;
}

export const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    injAddress: null,
    walletType: null,
    injBalance: '0.00',
    votingPower: '0.00',
    isConnecting: false,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedWallet = localStorage.getItem('arena_connected_wallet') as WalletType | null;
    if (savedWallet) {
      connect(savedWallet).catch(() => {
        localStorage.removeItem('arena_connected_wallet');
      });
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const connect = async (type: WalletType) => {
    setWalletState((prev) => ({ ...prev, isConnecting: true }));
    try {
      const newState = await WalletService.connectWallet(type);
      setWalletState(newState);
      localStorage.setItem('arena_connected_wallet', type);
    } catch (error) {
      setWalletState((prev) => ({ ...prev, isConnecting: false }));
      throw error;
    }
  };

  const disconnect = () => {
    const newState = WalletService.disconnectWallet();
    setWalletState(newState);
    localStorage.removeItem('arena_connected_wallet');
  };

  return (
    <WalletContext.Provider
      value={{
        walletState,
        isModalOpen,
        openModal,
        closeModal,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
