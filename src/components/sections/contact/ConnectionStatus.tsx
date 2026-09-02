'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export interface ConnectionStatusProps {
  status: 'idle' | 'success' | 'error';
  message?: string;
  onRetry?: () => void;
}

/**
 * ConnectionStatus Component
 *
 * Displays success/error states for the TCP handshake contact form.
 * Success shows "Connection Established" with circuit-to-checkmark animation.
 *
 * Requirements: 16.8, 16.9
 */
export function ConnectionStatus({ status, message, onRetry }: ConnectionStatusProps) {
  if (status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="mt-6"
    >
      {status === 'success' && (
        <div className="bg-signal-green/10 border-signal-green space-y-3 rounded-lg border-2 p-6">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              <CheckCircle2 className="text-signal-green h-6 w-6" />
            </motion.div>
            <h3 className="font-display text-signal-green text-lg font-bold">
              Connection Established ✓
            </h3>
          </div>
          <p className="text-text-secondary pl-9 text-sm">
            {message ||
              'Message sent successfully. You will receive a response within 24-48 hours.'}
          </p>

          {/* TCP handshake visual */}
          <div className="text-signal-green flex items-center justify-center gap-2 pt-2 font-mono text-xs">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              SYN
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              →
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              SYN-ACK
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              →
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              ACK
            </motion.span>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-signal-red/10 border-signal-red space-y-3 rounded-lg border-2 p-6">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
            >
              <XCircle className="text-signal-red h-6 w-6" />
            </motion.div>
            <h3 className="font-display text-signal-red text-lg font-bold">Connection Failed</h3>
          </div>
          <p className="text-text-secondary pl-9 text-sm">
            {message || 'Failed to send message. Please check your connection and try again.'}
          </p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="text-signal-red hover:text-signal-red/80 mt-3 ml-9 flex items-center gap-2 font-mono text-sm transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
