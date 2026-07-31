'use client';

import React from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { NETWORK_CONFIG } from '../../lib/config';

interface SuccessToastProps {
  message: string;
  txHash?: string;
  onClose?: () => void;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({ message, txHash, onClose }) => {
  const explorerUrl = txHash ? `${NETWORK_CONFIG.explorerUrl}/transaction/${txHash}` : null;

  return (
    <div className="flex items-start gap-3 bg-slate-900/95 border border-cyber-green/40 shadow-neon-green rounded-xl p-4 text-slate-100 max-w-md backdrop-blur-md">
      <div className="p-2 rounded-lg bg-cyber-green/10 text-cyber-green border border-cyber-green/30">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-cyber-green text-sm">Transaction Successful</h4>
        <p className="text-xs text-slate-300 mt-1">{message}</p>
        {explorerUrl && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-cyber-cyan hover:underline mt-2 font-mono"
          >
            <span>View on Explorer</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
